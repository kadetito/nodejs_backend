import express = require("express");
import path = require("path");
import bodyParser = require("body-parser");
import usuarios from "../router/router.usuarios";
import tareas from "../router/router.tareas";
import jornadas from "../router/router.jornadas";
import fileUpload = require("express-fileupload");
export default class Server {
  public app: express.Application;
  public port: number;
  constructor(puerto: number) {
    this.port = puerto;
    this.app = express();
    this.middlewares();
    this.routes();
  }

  static init(puerto: number) {
    return new Server(puerto);
  }

  settings() {
    this.app.set("port", this.port || process.env.PORT || 3000);
  }
  routes() {
    this.app.use(usuarios);
    this.app.use(tareas);
    this.app.use(jornadas);
  }
  middlewares() {
    this.app.use(bodyParser.urlencoded({ extended: false })); //body parser, nuevo en express
    this.app.use(express.json()); //body parser, nuevo en express
    this.app.use(fileUpload({ useTempFiles: true })); //express-fileupload
  }

  private publicFolder() {
    const publicPath = path.resolve(__dirname, "../public");
    this.app.use(express.static(publicPath));
  }

  async start(callback: () => void) {
    await this.app.listen(this.port, callback);
    this.publicFolder();
  }
}
