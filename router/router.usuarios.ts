import { Router } from "express";
import { verificaToken } from "../middleware/auth.middleware";

import {
  listUsuarios,
  createUsuario,
  detalleUsuario,
  loginUsuario,
  deleteUsuario,
  updateUsuario,
  updateToken,
  observaToken,
} from "../controllers/usuarios.controller";

const usuarios = Router();

usuarios.route("/users").get(listUsuarios);
usuarios.route("/crtuser").post(createUsuario);
usuarios.route("/login").post(loginUsuario);
usuarios.route("/user/:id_persona").get(detalleUsuario);
usuarios.route("/deluser/:id_persona").delete(deleteUsuario);
usuarios.route("/upduser").put(updateUsuario);
usuarios.route("/updtoken").post(verificaToken, updateToken);
usuarios.route("/vltkn").get(observaToken);
export default usuarios;
