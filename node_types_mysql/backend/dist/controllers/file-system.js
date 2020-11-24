"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    guardarImagenTemporal(file, userId) {
        return new Promise((resolve, reject) => {
            //crear paths
            const path = this.crearDirectorioUser(userId);
            //crear archivo
            const nombreFile = this.generarNombreUnico(file.name);
            //mover archivo del temp al directorio
            file.mv(`${path}/${nombreFile}`, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    generarNombreUnico(nombreOriginal) {
        const nombreArr = nombreOriginal.split(".");
        const extension = nombreArr[nombreArr.length - 1];
        const idUnico = uniqid_1.default();
        return `${idUnico}.${extension}`;
    }
    crearDirectorioUser(userId) {
        const pathUser = path_1.default.resolve(__dirname, "../uploads/", userId);
        const pathUserTemp = pathUser + "/temp";
        const existeDir = fs_1.default.existsSync(pathUser);
        if (!existeDir) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }
    imagenesToPost(userId) {
        const pathTemp = path_1.default.resolve(__dirname, "../uploads/", userId, "temp");
        const pathPost = path_1.default.resolve(__dirname, "../uploads/", userId, "imagenes");
        if (!fs_1.default.existsSync(pathTemp)) {
            return [];
        }
        if (!fs_1.default.existsSync(pathPost)) {
            fs_1.default.mkdirSync(pathPost);
        }
        const imagenesTemp = this.obtenerimgTemp(userId);
        //movemos las imagenes en un rename
        imagenesTemp.forEach((imagen) => {
            fs_1.default.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`);
        });
        return imagenesTemp;
    }
    obtenerimgTemp(userId) {
        const pathTemp = path_1.default.resolve(__dirname, "../uploads/", userId, "temp");
        return fs_1.default.readdirSync(pathTemp) || [];
    }
}
exports.default = FileSystem;
