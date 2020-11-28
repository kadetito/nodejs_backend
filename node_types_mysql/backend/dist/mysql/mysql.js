"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log("Clase inicializada");
        this.conn = mysql.createConnection({
            host: "qaei887.rafapenya.com",
            user: "qaei887",
            password: "JRK441e22",
            database: "qaei887",
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, objeto, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.instance.conn.query(query, objeto, (error, results, fields) => {
                if (error) {
                    console.log("Error en query");
                    console.log(error);
                    return callback(error);
                }
                if (results.length === 0) {
                    callback("El registro solicitado no existe");
                }
                else {
                    callback(null, results);
                }
            });
        });
    }
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.connect((error) => {
                if (error) {
                    console.log(error.message);
                    return;
                }
                this.conectado = true;
            });
        });
    }
}
exports.default = MySQL;
