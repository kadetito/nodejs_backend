"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJornada = exports.deleteJornada = exports.detalleJornada = exports.createJornada = exports.listJornadas = void 0;
const mysql_1 = __importDefault(require("../mysql/mysql"));
function listJornadas(req, res) {
    const objeto = "";
    const query = `SELECT * FROM panel_registro_jornada`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, jornadas) => {
        if (error) {
            res.status(400).json({
                ok: false,
                warning: "El FBI se dirige a su domicilio",
            });
        }
        else {
            res.json({
                ok: true,
                jornadas: jornadas,
            });
        }
    });
}
exports.listJornadas = listJornadas;
function createJornada(req, res) {
    const objeto = req.body;
    const query = `INSERT INTO panel_registro_jornada SET ?`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, jornadas) => {
        if (error) {
            res.status(400).json({
                ok: false,
                warning: "Fallo en la recepcion de datos",
            });
        }
        else {
            res.json({
                ok: true,
                jornadas: jornadas,
            });
        }
    });
}
exports.createJornada = createJornada;
function detalleJornada(req, res) {
    const id_jornada = mysql_1.default.instance.conn.escape(req.params.id_jornada);
    const objeto = "";
    const query = `SELECT * FROM panel_registro_jornada WHERE id_jornada=${id_jornada}`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, jornada) => {
        if (error) {
            res.status(400).json({
                ok: false,
                warning: "El FBI se dirige a su domicilio",
                error: error,
            });
        }
        else {
            res.json({
                ok: true,
                jornada: jornada,
            });
        }
    });
}
exports.detalleJornada = detalleJornada;
function deleteJornada(req, res) {
    const id_jornada = mysql_1.default.instance.conn.escape(req.params.id_jornada);
    const objeto = "";
    const query = `SELECT * FROM panel_registro_jornada WHERE id_jornada=${id_jornada}`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, jornada) => {
        if (error) {
            res.status(400).json({
                ok: false,
                warning: "El FBI se dirige a su domicilio",
            });
        }
        else {
            res.json({
                ok: true,
                jornada: jornada,
            });
        }
    });
}
exports.deleteJornada = deleteJornada;
function updateJornada(req, res) {
    const id_jornada = mysql_1.default.instance.conn.escape(req.params.id_jornada);
    const objeto = req.body;
    const query = `UPDATE panel_registro_jornada SET ? WHERE id_jornada = ${id_jornada}`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, jornadas) => {
        if (error) {
            res.status(400).json({
                ok: false,
                warning: "El FBI se dirige a su domicilio",
            });
        }
        else {
            res.json({
                ok: true,
                jornadas: jornadas,
            });
        }
    });
}
exports.updateJornada = updateJornada;
