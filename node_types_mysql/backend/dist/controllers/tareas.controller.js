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
exports.viewFile = exports.viewFilesTarea = exports.viewImagen = exports.viewImagenesTarea = exports.uploadFiles = exports.uploadImages = exports.updateTarea = exports.deleteTarea = exports.detalleTarea = exports.createTarea = exports.listTareas = void 0;
const mysql_1 = __importDefault(require("../mysql/mysql"));
const file_system_1 = __importDefault(require("./file-system"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fileSystem = new file_system_1.default();
function listTareas(req, res) {
    const objeto = "";
    const query = `SELECT * FROM panel_tareas ORDER by id_tarea DESC`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, tareas) => {
        if (error) {
            res.status(400).json({
                ok: false,
                warning: "El FBI se dirige a su domicilio",
            });
        }
        else {
            res.json({
                ok: true,
                tareas: tareas,
            });
        }
    });
}
exports.listTareas = listTareas;
function createTarea(req, res) {
    // const prs: string = req.get("x-prs") || "";
    const objeto = "";
    const tarea_referencia = req.body.tarea_referencia;
    const tarea_tarea = req.body.tarea_tarea;
    const tarea_asignada = req.body.tarea_asignada;
    const tarea_fecha_creacion = req.body.tarea_fecha_creacion;
    const tarea_descripcion = req.body.tarea_descripcion;
    const tarea_horas = req.body.tarea_horas;
    const tarea_cliente = req.body.tarea_cliente;
    const tarea_estado = req.body.tarea_estado;
    const tarea_coordenadas = req.body.tarea_coordenadas;
    const query = `INSERT INTO panel_tareas (tarea_referencia,tarea_tarea,tarea_asignada,tarea_fecha_creacion,tarea_descripcion,tarea_horas,tarea_cliente,tarea_estado,tarea_coordenadas) VALUES ('${tarea_referencia}','${tarea_tarea}','${tarea_asignada}','${tarea_fecha_creacion}','${tarea_descripcion}','${tarea_horas}','${tarea_cliente}','${tarea_estado}','${tarea_coordenadas}')`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, tareas) => {
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
                tareas: tareas,
            });
        }
    });
}
exports.createTarea = createTarea;
function detalleTarea(req, res) {
    const id_tarea = mysql_1.default.instance.conn.escape(req.params.id_tarea);
    const objeto = "";
    const query = `SELECT * FROM panel_tareas WHERE id_tarea=${id_tarea}`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, tarea) => {
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
                tarea: tarea,
            });
        }
    });
}
exports.detalleTarea = detalleTarea;
function deleteTarea(req, res) {
    const id_tarea = mysql_1.default.instance.conn.escape(req.params.id_tarea);
    const objeto = "";
    const query = `SELECT * FROM panel_tareas WHERE id_tarea=${id_tarea}`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, tarea) => {
        if (error) {
            res.status(400).json({
                ok: false,
                warning: "El FBI se dirige a su domicilio",
            });
        }
        else {
            res.json({
                ok: true,
                tarea: tarea,
            });
        }
    });
}
exports.deleteTarea = deleteTarea;
function updateTarea(req, res) {
    const id_tarea = mysql_1.default.instance.conn.escape(req.params.id_tarea);
    const objeto = req.body;
    const query = `UPDATE panel_tareas SET ? WHERE id_tarea = ${id_tarea}`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, tareas) => {
        if (error) {
            res.status(400).json({
                ok: false,
                warning: "El FBI se dirige a su domicilio",
            });
        }
        else {
            res.json({
                ok: true,
                tareas: tareas,
            });
        }
    });
}
exports.updateTarea = updateTarea;
function uploadImages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id_tarea = mysql_1.default.instance.conn.escape(req.body.id_tarea);
        const imagenes = fileSystem.imagenesToPost(id_tarea);
        req.body.imagen = imagenes;
        if (!req.files) {
            return res.status(400).json({
                ok: false,
                warning: "la subida del archivo ha fallado",
            });
        }
        const file = req.files.imagen;
        if (!file) {
            return res.status(400).json({
                ok: false,
                warning: "no ha podido subirse el archivo",
            });
        }
        if (!file.mimetype.includes("image")) {
            return res.status(400).json({
                ok: false,
                warning: "el archivo no es una imagen",
            });
        }
        if (file.size > 3e6) {
            return res.status(400).json({
                ok: false,
                warning: "el archivo es mayor de 3MB",
            });
        }
        yield fileSystem.guardarImagenTemporal(file, id_tarea);
        const objeto = req.body;
        //console.log(objeto);
        const query = `INSERT INTO panel_imagenes SET ?`;
        mysql_1.default.ejecutarQuery(query, objeto, (error, tareas) => {
            if (error) {
                res.status(400).json({
                    ok: false,
                    warning: "El FBI se dirige a su domicilio",
                });
            }
            else {
                res.json({
                    ok: false,
                    id_tarea: id_tarea,
                    file: file,
                });
            }
        });
    });
}
exports.uploadImages = uploadImages;
function uploadFiles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id_tarea = mysql_1.default.instance.conn.escape(req.body.id_tarea);
        const archivos = fileSystem.imagenesToPost(id_tarea);
        req.body.archivo = archivos;
        if (!req.files) {
            return res.status(400).json({
                ok: false,
                warning: "la subida del archivo ha fallado",
            });
        }
        const file = req.files.imagen;
        if (!file) {
            return res.status(400).json({
                ok: false,
                warning: "no ha podido subirse el archivo",
            });
        }
        if (!(file.mimetype.includes("application/pdf") ||
            file.mimetype.includes("application/x-rar-compressed") ||
            file.mimetype.includes("application/zip"))) {
            return res.status(400).json({
                ok: false,
                warning: "el archivo no es un pdf, rar o zip",
            });
        }
        if (file.size > 3e6) {
            return res.status(400).json({
                ok: false,
                warning: "el archivo es mayor de 3MB",
            });
        }
        yield fileSystem.guardarImagenTemporal(file, id_tarea);
        const objeto = req.body;
        //console.log(objeto);
        const query = `INSERT INTO panel_archivos SET ?`;
        mysql_1.default.ejecutarQuery(query, objeto, (error, tareas) => {
            if (error) {
                res.status(400).json({
                    ok: false,
                    warning: "El FBI se dirige a su domicilio",
                });
            }
            else {
                res.json({
                    ok: false,
                    id_tarea: id_tarea,
                    file: file,
                });
            }
        });
    });
}
exports.uploadFiles = uploadFiles;
function viewImagenesTarea(req, res) {
    const id_tarea = mysql_1.default.instance.conn.escape(req.params.id_tarea);
    const objeto = "";
    const query = `SELECT * FROM panel_imagenes WHERE id_tarea=${id_tarea}`;
    const noImage = path_1.default.resolve(__dirname, "../img/no-photo.png");
    mysql_1.default.ejecutarQuery(query, objeto, (error, tarea) => {
        if (error) {
            res.status(400).json({
                ok: false,
                tarea: noImage,
            });
        }
        else {
            res.json({
                ok: true,
                tarea: tarea,
            });
        }
    });
}
exports.viewImagenesTarea = viewImagenesTarea;
function viewImagen(req, res) {
    const id_imagen = mysql_1.default.instance.conn.escape(req.params.id_imagen);
    const id_tarea = mysql_1.default.instance.conn.escape(req.params.id_tarea);
    const objeto = "";
    const query = `SELECT * FROM panel_imagenes WHERE id_imagen=${id_imagen} AND id_tarea=${id_tarea}`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, tarea) => {
        if (error) {
            return path_1.default.resolve(__dirname, "../img/no-photo.png");
        }
        else {
            const pathServidor = path_1.default.resolve(__dirname, "../uploads/", id_tarea, "imagenes", tarea[0].imagen);
            return pathServidor;
        }
    });
}
exports.viewImagen = viewImagen;
function viewFilesTarea(req, res) {
    const id_tarea = mysql_1.default.instance.conn.escape(req.params.id_tarea);
    const objeto = "";
    const query = `SELECT * FROM panel_archivos WHERE id_tarea=${id_tarea}`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, tarea) => {
        if (error) {
            res.status(400).json({
                ok: false,
                warning: "El archivo solicitado no existe o ha sido eliminado",
                error: error,
            });
        }
        else {
            res.json({
                ok: true,
                tarea: tarea,
            });
        }
    });
}
exports.viewFilesTarea = viewFilesTarea;
function viewFile(req, res) {
    const id_archivo = mysql_1.default.instance.conn.escape(req.params.id_archivo);
    const id_tarea = mysql_1.default.instance.conn.escape(req.params.id_tarea);
    const objeto = "";
    const query = `SELECT * FROM panel_archivos WHERE id_archivo=${id_archivo} AND id_tarea=${id_tarea}`;
    mysql_1.default.ejecutarQuery(query, objeto, (error, tarea) => {
        if (error) {
            res.status(400).json({
                ok: false,
                warning: "El archivo solicitado no existe o ha sido eliminado",
                error: error,
            });
        }
        else {
            const pathServidor = path_1.default.resolve(__dirname, "../uploads/", id_tarea, "imagenes", tarea[0].archivo);
            const fileExiste = fs_1.default.existsSync(pathServidor);
            if (fileExiste) {
                res.json({
                    ok: true,
                    path: pathServidor,
                });
            }
            else {
                res.json({
                    ok: false,
                    warning: "El archivo no se halla en el servidor",
                });
            }
        }
    });
}
exports.viewFile = viewFile;
