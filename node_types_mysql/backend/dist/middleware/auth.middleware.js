"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaToken = void 0;
const token_1 = __importDefault(require("../controllers/token"));
exports.verificaToken = (req, res, next) => {
    const userToken = req.get("x-token") || "";
    token_1.default.comprobarToken(userToken)
        .then((decoded) => {
        req.usuarios = decoded.usuarios;
        next();
    })
        .catch((err) => {
        res.json({
            ok: false,
            warning: err,
            mensaje: "El contenido no está disponible, por favor intentelo en otro momento",
        });
    });
};
