import { Request, Response } from "express";
import MySQL from "../mysql/mysql";
import { Tareas } from "../interfaces/tareas.interface";
import { FileUpload } from "../interfaces/file-upload";
import FileSystem from "./file-system";
import { Imagenes } from "../interfaces/imagenes.interface";
import { Archivos } from "../interfaces/archivos.interface";
import path from "path";
import fs from "fs";
const fileSystem = new FileSystem();

export function listTareas(req: Request, res: Response) {
  const objeto = "";
  const query = `SELECT * FROM panel_tareas ORDER by id_tarea DESC`;
  MySQL.ejecutarQuery(query, objeto, (error: any, tareas: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        warning: "El FBI se dirige a su domicilio",
        // error: error,
      });
    } else {
      res.json({
        ok: true,
        tareas: tareas,
      });
    }
  });
}

export function createTarea(req: Request, res: Response) {
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
  MySQL.ejecutarQuery(query, objeto, (error: any, tareas: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        warning: "El FBI se dirige a su domicilio",
        error: error,
      });
    } else {
      res.json({
        ok: true,
        tareas: tareas,
      });
    }
  });
}

export function detalleTarea(req: Request, res: Response) {
  const id_tarea = MySQL.instance.conn.escape(req.params.id_tarea);
  const objeto = "";
  const query = `SELECT * FROM panel_tareas WHERE id_tarea=${id_tarea}`;

  MySQL.ejecutarQuery(query, objeto, (error: any, tarea: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        warning: "El FBI se dirige a su domicilio",
        error: error,
      });
    } else {
      res.json({
        ok: true,
        tarea: tarea,
      });
    }
  });
}

export function deleteTarea(req: Request, res: Response) {
  const id_tarea = MySQL.instance.conn.escape(req.params.id_tarea);
  const objeto = "";
  const query = `SELECT * FROM panel_tareas WHERE id_tarea=${id_tarea}`;

  MySQL.ejecutarQuery(query, objeto, (error: any, tarea: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        warning: "El FBI se dirige a su domicilio",
        // error: error,
      });
    } else {
      res.json({
        ok: true,
        tarea: tarea,
      });
    }
  });
}

export function updateTarea(req: Request, res: Response) {
  const id_tarea = MySQL.instance.conn.escape(req.params.id_tarea);

  const objeto: Tareas = req.body;
  const query = `UPDATE panel_tareas SET ? WHERE id_tarea = ${id_tarea}`;
  MySQL.ejecutarQuery(query, objeto, (error: any, tareas: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        warning: "El FBI se dirige a su domicilio",
        // error: error,
      });
    } else {
      res.json({
        ok: true,
        tareas: tareas,
      });
    }
  });
}

export async function uploadImages(req: any, res: Response) {
  const id_tarea = MySQL.instance.conn.escape(req.body.id_tarea);

  const imagenes = fileSystem.imagenesToPost(id_tarea);
  req.body.imagen = imagenes;

  if (!req.files) {
    return res.status(400).json({
      ok: false,
      warning: "la subida del archivo ha fallado",
    });
  }
  const file: FileUpload = req.files.imagen;

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

  await fileSystem.guardarImagenTemporal(file, id_tarea);

  const objeto: Imagenes = req.body;
  //console.log(objeto);
  const query = `INSERT INTO panel_imagenes SET ?`;
  MySQL.ejecutarQuery(query, objeto, (error: any, tareas: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        warning: "El FBI se dirige a su domicilio",
        // error: error,
      });
    } else {
      res.json({
        ok: false,
        id_tarea: id_tarea,
        file: file,
      });
    }
  });
}

export async function uploadFiles(req: any, res: Response) {
  const id_tarea = MySQL.instance.conn.escape(req.body.id_tarea);

  const archivos = fileSystem.imagenesToPost(id_tarea);
  req.body.archivo = archivos;

  if (!req.files) {
    return res.status(400).json({
      ok: false,
      warning: "la subida del archivo ha fallado",
    });
  }
  const file: FileUpload = req.files.imagen;

  if (!file) {
    return res.status(400).json({
      ok: false,
      warning: "no ha podido subirse el archivo",
    });
  }

  if (
    !(
      file.mimetype.includes("application/pdf") ||
      file.mimetype.includes("application/x-rar-compressed") ||
      file.mimetype.includes("application/zip")
    )
  ) {
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

  await fileSystem.guardarImagenTemporal(file, id_tarea);

  const objeto: Archivos = req.body;
  //console.log(objeto);
  const query = `INSERT INTO panel_archivos SET ?`;
  MySQL.ejecutarQuery(query, objeto, (error: any, tareas: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        warning: "El FBI se dirige a su domicilio",
        // error: error,
      });
    } else {
      res.json({
        ok: false,
        id_tarea: id_tarea,
        file: file,
      });
    }
  });
}

export function viewImagenesTarea(req: Request, res: Response) {
  const id_tarea = MySQL.instance.conn.escape(req.params.id_tarea);
  const objeto = "";
  const query = `SELECT * FROM panel_imagenes WHERE id_tarea=${id_tarea}`;
  const noImage = path.resolve(__dirname, "../img/no-photo.png");

  MySQL.ejecutarQuery(query, objeto, (error: any, tarea: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        tarea: noImage,
      });
    } else {
      res.json({
        ok: true,
        tarea: tarea,
      });
    }
  });
}

export function viewImagen(req: Request, res: Response) {
  const id_imagen = MySQL.instance.conn.escape(req.params.id_imagen);
  const id_tarea = MySQL.instance.conn.escape(req.params.id_tarea);
  const objeto = "";
  const query = `SELECT * FROM panel_imagenes WHERE id_imagen=${id_imagen} AND id_tarea=${id_tarea}`;
  MySQL.ejecutarQuery(query, objeto, (error: any, tarea: Imagenes[]) => {
    if (error) {
      return path.resolve(__dirname, "../img/no-photo.png");
    } else {
      const pathServidor = path.resolve(
        __dirname,
        "../uploads/",
        id_tarea,
        "imagenes",
        tarea[0].imagen
      );
      return pathServidor;
    }
  });
}

export function viewFilesTarea(req: Request, res: Response) {
  const id_tarea = MySQL.instance.conn.escape(req.params.id_tarea);
  const objeto = "";
  const query = `SELECT * FROM panel_archivos WHERE id_tarea=${id_tarea}`;

  MySQL.ejecutarQuery(query, objeto, (error: any, tarea: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        warning: "El archivo solicitado no existe o ha sido eliminado",
        error: error,
      });
    } else {
      res.json({
        ok: true,
        tarea: tarea,
      });
    }
  });
}

export function viewFile(req: Request, res: Response) {
  const id_archivo = MySQL.instance.conn.escape(req.params.id_archivo);
  const id_tarea = MySQL.instance.conn.escape(req.params.id_tarea);
  const objeto = "";
  const query = `SELECT * FROM panel_archivos WHERE id_archivo=${id_archivo} AND id_tarea=${id_tarea}`;

  MySQL.ejecutarQuery(query, objeto, (error: any, tarea: Archivos[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        warning: "El archivo solicitado no existe o ha sido eliminado",
        error: error,
      });
    } else {
      const pathServidor = path.resolve(
        __dirname,
        "../uploads/",
        id_tarea,
        "imagenes",
        tarea[0].archivo
      );
      const fileExiste = fs.existsSync(pathServidor);
      if (fileExiste) {
        res.json({
          ok: true,
          path: pathServidor,
        });
      } else {
        res.json({
          ok: false,
          warning: "El archivo no se halla en el servidor",
        });
      }
    }
  });
}
