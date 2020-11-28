import { Router } from "express";

import {
  listJornadas,
  createJornada,
  detalleJornada,
  deleteJornada,
  updateJornada,
} from "../controllers/jornadas.controller";

const jornadas = Router();

jornadas.route("/jornadas").get(listJornadas);
jornadas.route("/crtjornada").post(createJornada);
jornadas.route("/jornada/:id_jornada").get(detalleJornada);
jornadas.route("/deljornada/:id_jornada").delete(deleteJornada);
jornadas.route("/updjornada/:id_jornada").put(updateJornada);

export default jornadas;
