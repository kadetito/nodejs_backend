import mysql = require("mysql");

export default class MySQL {
  //patron singleton
  private static _instance: MySQL;
  conn: mysql.Connection;
  conectado: boolean = false;

  constructor() {
    console.log("Clase inicializada");
    this.conn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "qaei887",
    });

    this.conectarDB();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  static async ejecutarQuery(query: string, objeto: any, callback: Function) {
    await this.instance.conn.query(
      query,
      objeto,
      (error, results: Object[], fields) => {
        if (error) {
          console.log("Error en query");
          console.log(error);
          return callback(error);
        }
        if (results.length === 0) {
          callback("El registro solicitado no existe");
        } else {
          callback(null, results);
        }
      }
    );
  }

  private async conectarDB() {
    await this.conn.connect((error: mysql.MysqlError) => {
      if (error) {
        console.log(error.message);
        return;
      }
      this.conectado = true;
    });
  }
}
