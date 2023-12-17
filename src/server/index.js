import dotenv from "dotenv";
import Hapi from "@hapi/hapi";
import { controllers } from "../controller/index.js";

dotenv.config();

const init = async () => {
  const port = process.env.PORT || 9000;
  const server = Hapi.server({
    port,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });
  server.route(controllers);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
