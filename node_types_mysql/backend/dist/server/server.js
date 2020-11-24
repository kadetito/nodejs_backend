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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router_usuarios_1 = __importDefault(require("../router/router.usuarios"));
const router_tareas_1 = __importDefault(require("../router/router.tareas"));
const router_jornadas_1 = __importDefault(require("../router/router.jornadas"));
const fileUpload = require("express-fileupload");
class Server {
    constructor(puerto) {
        this.port = puerto;
        this.app = express();
        this.middlewares();
        this.routes();
    }
    static init(puerto) {
        return new Server(puerto);
    }
    settings() {
        this.app.set("port", this.port || process.env.PORT || 3000);
    }
    routes() {
        this.app.use(router_usuarios_1.default);
        this.app.use(router_tareas_1.default);
        this.app.use(router_jornadas_1.default);
    }
    middlewares() {
        this.app.use(bodyParser.urlencoded({ extended: false })); //body parser, nuevo en express
        this.app.use(express.json()); //body parser, nuevo en express
        this.app.use(fileUpload({ useTempFiles: true })); //express-fileupload
    }
    publicFolder() {
        const publicPath = path.resolve(__dirname, "../public");
        this.app.use(express.static(publicPath));
    }
    start(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.port, callback);
            this.publicFolder();
        });
    }
}
exports.default = Server;
