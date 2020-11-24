import { Response, Request, NextFunction } from "express";
import Token from "../controllers/token";
import usuarios from "../router/router.usuarios";

export const verificaToken = (req: any, res: Response, next: NextFunction) => {
  const userToken = req.get("x-token") || "";
  Token.comprobarToken(userToken)
    .then((decoded: any) => {
      req.usuarios = decoded.usuarios;
      next();
    })
    .catch((err) => {
      res.json({
        ok: false,
        warning: err,
        mensaje:
          "El contenido no está disponible, por favor intentelo en otro momento",
      });
    });
};
