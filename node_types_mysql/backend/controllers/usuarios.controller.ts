import { Request, response, Response } from "express";
import MySQL from "../mysql/mysql";
import { Usuarios } from "../interfaces/usuarios.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Token from "./token";
import usuarios from "../router/router.usuarios";

export function listUsuarios(req: Request, res: Response) {
  const objeto = "";
  const query = `SELECT * FROM panel_personas`;
  MySQL.ejecutarQuery(query, objeto, (error: any, usuarios: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        warning: "El FBI se dirige a su domicilio",
        // error: error,
      });
    } else {
      res.json({
        ok: true,
        usuarios: usuarios,
      });
    }
  });
}

export function createUsuario(req: Request, res: Response) {
  const tokenUser = Token.getJwtToken({
    nombres: req.body.nombres,
    email: req.body.email,
  });
  const objeto = {
    nombres: req.body.nombres,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    imagen: req.body.imagen,
    id_rol: req.body.id_rol,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
    registrado: req.body.registrado,
    token: tokenUser,
  };

  const query = `INSERT INTO panel_personas SET ?`;
  MySQL.ejecutarQuery(query, objeto, (error: any, usuarios: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        warning: "Imposible intervenir en estos momentos ",
        // error: error,
      });
    } else {
      //guardamos el token de registro en la cabecera del envio
      res.json({
        ok: true,
        token: tokenUser,
        usuarios: usuarios,
      });
    }
  });
}

export function loginUsuario(req: Request, res: Response) {
  const objeto = "";
  const email = MySQL.instance.conn.escape(req.body.email);
  var pass = req.body.password;
  const query = `SELECT * FROM panel_personas WHERE email=${email}`;
  MySQL.ejecutarQuery(query, objeto, (error: any, usuario: any) => {
    if (error) {
      res.json({
        ok: false,
        warning: "Usuario/contraseña no coinciden",
        error: error,
      });
    } else {
      var passwordIsValid = bcrypt.compareSync(pass, usuario[0].password);
      const tokenUser = Token.getJwtToken({
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
        MySQL.ejecutarQuery(query, objeto, (error: any, usuarios: Object[]) => {
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
      } else {
        res.json({
          ok: false,
          message: "La información no es correcta",
        });
      }
    }
  });
}

export function detalleUsuario(req: Request, res: Response) {
  const id_persona = MySQL.instance.conn.escape(req.params.id_persona);
  const objeto = "";
  const query = `SELECT * FROM panel_personas WHERE id_persona=${id_persona}`;

  MySQL.ejecutarQuery(query, objeto, (error: any, usuario: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        warning: "El detalle no está disponible",
        error: error,
      });
    } else {
      res.json({
        ok: true,
        usuario: usuario,
      });
    }
  });
}

export function deleteUsuario(req: Request, res: Response) {
  const id_persona = MySQL.instance.conn.escape(req.params.id_persona);
  const objeto = "";
  const query = `SELECT * FROM panel_personas WHERE id_persona=${id_persona}`;

  MySQL.ejecutarQuery(query, objeto, (error: any, usuario: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        warning: "Imposible acceder a la modificacion",
        // error: error,
      });
    } else {
      res.json({
        ok: true,
        usuario: usuario,
      });
    }
  });
}

export function updateUsuario(req: Request, res: Response) {
  const id_persona = MySQL.instance.conn.escape(req.params.id_persona);
  const objeto: Usuarios = req.body;
  const query = `UPDATE panel_personas SET ? WHERE id_persona = ${id_persona}`;
  MySQL.ejecutarQuery(query, objeto, (error: any, usuarios: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        warning: "No se puede usar la gestion",
        // error: error,
      });
    } else {
      res.json({
        ok: true,
        usuarios: usuarios,
      });
    }
  });
}

export function updateToken(req: any, res: Response) {
  const id_persona: string = req.get("x-prs") || "";
  const token: string = req.get("x-token") || "";
  const objeto = "";
  // console.log(id_persona);
  const query = `UPDATE panel_personas SET token='${token}' WHERE id_persona=${id_persona}`;

  MySQL.ejecutarQuery(query, objeto, (error: any, usuarios: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        warning: "El token no se puede actualizar",
        //error: error,
      });
    } else {
      res.json({
        ok: true,
        //message: "el token coincide",
        //id_persona: id_persona,
        //token: token,
      });
    }
  });
}

//TODO OBSERVASR TOKEN
//almacenar en locastorage?
export function observaToken(req: any, res: Response) {
  const usuari: string = req.get("x-token") || "";

  const objeto = "";
  const query = `SELECT * FROM panel_personas WHERE token=${usuari}`;

  MySQL.ejecutarQuery(query, objeto, (error: any, usuario: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        usuari: usuari,
        warning: "no se observa el token",
        // error: error,
      });
    } else {
      res.json({
        ok: true,
        usuario: usuario,
      });
    }
  });
}
