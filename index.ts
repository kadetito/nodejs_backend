import dotenv from "dotenv";
dotenv.config();

import Server from "./server/server";
const server = Server.init(3000);

server.start(() => {
  console.log("Servidor está levantado en puerto 3000");
});
