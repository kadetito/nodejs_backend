import { Router } from "express";
import { verificaToken } from "../middleware/auth.middleware";

import {
  listTareas,
  createTarea,
  detalleTarea,
  deleteTarea,
  updateTarea,
  uploadImages,
  uploadFiles,
  viewImagenesTarea,
  viewFilesTarea,
  viewImagen,
  viewFile,
} from "../controllers/tareas.controller";

const tareas = Router();
//tareas.route("/tareas").get(verificaToken, listTareas);
tareas.route("/tareas").get(listTareas);
tareas.route("/crttarea").post(verificaToken, createTarea);
tareas.route("/tarea/:id_tarea").get(verificaToken, detalleTarea);
tareas.route("/deltarea/:id_tarea").delete(verificaToken, deleteTarea);
tareas.route("/updtarea/:id_tarea").put(verificaToken, updateTarea);
tareas.route("/updtimages/:id_tarea").put(verificaToken, uploadImages);
tareas.route("/updfiles/:id_tarea").put(verificaToken, uploadFiles);
tareas.route("/imgstarea/:id_tarea").get(verificaToken, viewImagenesTarea);
tareas.route("/filestarea/:id_tarea").get(verificaToken, viewFilesTarea);
tareas.route("/imgtarea/:id_imagen/:id_tarea").get(verificaToken, viewImagen);
tareas.route("/filetarea/:id_archivo/:id_tarea").get(verificaToken, viewFile);
export default tareas;
