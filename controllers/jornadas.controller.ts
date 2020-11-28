import { Request, Response } from "express";
import MySQL from "../mysql/mysql";
import { Jornadas } from "../interfaces/jornadas.interface";

export function listJornadas(req: Request, res: Response) {
  const objeto = "";
  const query = `SELECT * FROM panel_registro_jornada`;
  MySQL.ejecutarQuery(query, objeto, (error: any, jornadas: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        warning: "El FBI se dirige a su domicilio",
        // error: error,
      });
    } else {
      res.json({
        ok: true,
        jornadas: jornadas,
      });
    }
  });
}

export function createJornada(req: Request, res: Response) {
  const objeto: Jornadas = req.body;
  const query = `INSERT INTO panel_registro_jornada SET ?`;
  MySQL.ejecutarQuery(query, objeto, (error: any, jornadas: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        warning: "Fallo en la recepcion de datos",
        // error: error,
      });
    } else {
      res.json({
        ok: true,
        jornadas: jornadas,
      });
    }
  });
}

export function detalleJornada(req: Request, res: Response) {
  const id_jornada = MySQL.instance.conn.escape(req.params.id_jornada);
  const objeto = "";
  const query = `SELECT * FROM panel_registro_jornada WHERE id_jornada=${id_jornada}`;

  MySQL.ejecutarQuery(query, objeto, (error: any, jornada: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        warning: "El FBI se dirige a su domicilio",
        error: error,
      });
    } else {
      res.json({
        ok: true,
        jornada: jornada,
      });
    }
  });
}

export function deleteJornada(req: Request, res: Response) {
  const id_jornada = MySQL.instance.conn.escape(req.params.id_jornada);
  const objeto = "";
  const query = `SELECT * FROM panel_registro_jornada WHERE id_jornada=${id_jornada}`;

  MySQL.ejecutarQuery(query, objeto, (error: any, jornada: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        warning: "El FBI se dirige a su domicilio",
        // error: error,
      });
    } else {
      res.json({
        ok: true,
        jornada: jornada,
      });
    }
  });
}

export function updateJornada(req: Request, res: Response) {
  const id_jornada = MySQL.instance.conn.escape(req.params.id_jornada);
  const objeto: Jornadas = req.body;
  const query = `UPDATE panel_registro_jornada SET ? WHERE id_jornada = ${id_jornada}`;
  MySQL.ejecutarQuery(query, objeto, (error: any, jornadas: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        warning: "El FBI se dirige a su domicilio",
        // error: error,
      });
    } else {
      res.json({
        ok: true,
        jornadas: jornadas,
      });
    }
  });
}
