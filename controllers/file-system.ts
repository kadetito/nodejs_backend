import { FileUpload } from "../interfaces/file-upload";
import path from "path";
import fs from "fs";
import uniqid from "uniqid";
export default class FileSystem {
  constructor() {}

  guardarImagenTemporal(file: FileUpload, userId: string) {
    return new Promise((resolve, reject) => {
      //crear paths
      const path = this.crearDirectorioUser(userId);

      //crear archivo
      const nombreFile = this.generarNombreUnico(file.name);

      //mover archivo del temp al directorio
      file.mv(`${path}/${nombreFile}`, (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  private generarNombreUnico(nombreOriginal: string) {
    const nombreArr = nombreOriginal.split(".");
    const extension = nombreArr[nombreArr.length - 1];
    const idUnico = uniqid();

    return `${idUnico}.${extension}`;
  }

  private crearDirectorioUser(userId: string) {
    const pathUser = path.resolve(__dirname, "../uploads/", userId);
    const pathUserTemp = pathUser + "/temp";
    const existeDir = fs.existsSync(pathUser);
    if (!existeDir) {
      fs.mkdirSync(pathUser);
      fs.mkdirSync(pathUserTemp);
    }
    return pathUserTemp;
  }

  imagenesToPost(userId: string) {
    const pathTemp = path.resolve(__dirname, "../uploads/", userId, "temp");
    const pathPost = path.resolve(__dirname, "../uploads/", userId, "imagenes");

    if (!fs.existsSync(pathTemp)) {
      return [];
    }
    if (!fs.existsSync(pathPost)) {
      fs.mkdirSync(pathPost);
    }
    const imagenesTemp = this.obtenerimgTemp(userId);
    //movemos las imagenes en un rename
    imagenesTemp.forEach((imagen) => {
      fs.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`);
    });
    return imagenesTemp;
  }

  private obtenerimgTemp(userId: string) {
    const pathTemp = path.resolve(__dirname, "../uploads/", userId, "temp");
    return fs.readdirSync(pathTemp) || [];
  }
}
