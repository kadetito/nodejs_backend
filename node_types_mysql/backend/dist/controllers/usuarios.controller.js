"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.observaToken = exports.updateToken = exports.updateUsuario = exports.deleteUsuario = exports.detalleUsuario = exports.loginUsuario = exports.createUsuario = exports.listUsuarios = void 0;
const mysql_1 = __importDefault(require("../mysql/mysql"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("./token"));
function listUsuarios(req, res) {
    const objeto = "";
    const query = `SELECT * FROM panel_personas`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, usuarios) => {
        if (error) {
            res.status(400).json({
                ok: false,
                warning: "El FBI se dirige a su domicilio",
            });
        }
        else {
            res.json({
                ok: true,
                usuarios: usuarios,
            });
        }
    });
}
exports.listUsuarios = listUsuarios;
function createUsuario(req, res) {
    const tokenUser = token_1.default.getJwtToken({
        nombres: req.body.nombres,
        email: req.body.email,
    });
    const objeto = {
        nombres: req.body.nombres,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        imagen: req.body.imagen,
        id_rol: req.body.id_rol,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        registrado: req.body.registrado,
        token: tokenUser,
    };
    const query = `INSERT INTO panel_personas SET ?`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, usuarios) => {
        if (error) {
            res.status(400).json({
                ok: false,
                warning: "Imposible intervenir en estos momentos ",
            });
        }
        else {
            //guardamos el token de registro en la cabecera del envio
            res.json({
                ok: true,
                token: tokenUser,
                usuarios: usuarios,
            });
        }
    });
}
exports.createUsuario = createUsuario;
function loginUsuario(req, res) {
    const objeto = "";
    const email = mysql_1.default.instance.conn.escape(req.body.email);
    var pass = req.body.password;
    const query = `SELECT * FROM panel_personas WHERE email=${email}`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, usuario) => {
        if (error) {
            res.json({
                ok: false,
                warning: "Usuario/contraseña no coinciden",
                error: error,
            });
        }
        else {
            var passwordIsValid = bcrypt_1.default.compareSync(pass, usuario[0].password);
            const tokenUser = token_1.default.getJwtToken({
                nombres: usuario[0].nombres,
                email: usuario[0].email,
            });
            if (passwordIsValid === true) {
                res
                    .header({ "x-prs": usuario[0].id_persona, "x-token": tokenUser })
                    .json({
                    ok: true,
                    token: tokenUser,
                    usuario,
                });
                const identidad = usuario[0].id_persona;
                const query = `UPDATE panel_personas SET token='${tokenUser}' WHERE id_persona=${identidad}`;
                mysql_1.default.ejecutarQuery(query, objeto, (error, usuarios) => {
                    //   if (error) {
                    //     res.status(400).json({
                    //       ok: false,
                    //     });
                    //   } else {
                    //     res.json({
                    //       ok: true,
                    //     });
                    //   }
                });
            }
            else {
                res.json({
                    ok: false,
                    message: "La información no es correcta",
                });
            }
        }
    });
}
exports.loginUsuario = loginUsuario;
function detalleUsuario(req, res) {
    const id_persona = mysql_1.default.instance.conn.escape(req.params.id_persona);
    const objeto = "";
    const query = `SELECT * FROM panel_personas WHERE id_persona=${id_persona}`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, usuario) => {
        if (error) {
            res.status(400).json({
                ok: false,
                warning: "El detalle no está disponible",
                error: error,
            });
        }
        else {
            res.json({
                ok: true,
                usuario: usuario,
            });
        }
    });
}
exports.detalleUsuario = detalleUsuario;
function deleteUsuario(req, res) {
    const id_persona = mysql_1.default.instance.conn.escape(req.params.id_persona);
    const objeto = "";
    const query = `SELECT * FROM panel_personas WHERE id_persona=${id_persona}`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, usuario) => {
        if (error) {
            res.status(400).json({
                ok: false,
                warning: "Imposible acceder a la modificacion",
            });
        }
        else {
            res.json({
                ok: true,
                usuario: usuario,
            });
        }
    });
}
exports.deleteUsuario = deleteUsuario;
function updateUsuario(req, res) {
    const id_persona = mysql_1.default.instance.conn.escape(req.params.id_persona);
    const objeto = req.body;
    const query = `UPDATE panel_personas SET ? WHERE id_persona = ${id_persona}`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, usuarios) => {
        if (error) {
            res.status(400).json({
                ok: false,
                warning: "No se puede usar la gestion",
            });
        }
        else {
            res.json({
                ok: true,
                usuarios: usuarios,
            });
        }
    });
}
exports.updateUsuario = updateUsuario;
function updateToken(req, res) {
    const id_persona = req.get("x-prs") || "";
    const token = req.get("x-token") || "";
    const objeto = "";
    // console.log(id_persona);
    const query = `UPDATE panel_personas SET token='${token}' WHERE id_persona=${id_persona}`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, usuarios) => {
        if (error) {
            res.status(400).json({
                ok: false,
                warning: "El token no se puede actualizar",
            });
        }
        else {
            res.json({
                ok: true,
            });
        }
    });
}
exports.updateToken = updateToken;
//TODO OBSERVASR TOKEN
//almacenar en locastorage?
function observaToken(req, res) {
    const usuari = req.get("x-token") || "";
    const objeto = "";
    const query = `SELECT * FROM panel_personas WHERE token=${usuari}`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, usuario) => {
        if (error) {
            res.status(400).json({
                ok: false,
                usuari: usuari,
                warning: "no se observa el token",
            });
        }
        else {
            res.json({
                ok: true,
                usuario: usuario,
            });
        }
    });
}
exports.observaToken = observaToken;
