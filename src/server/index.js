import dotenv from "dotenv";
import Hapi from "@hapi/hapi";
import controllers from "../controller/index.js";

dotenv.config();

const init = async () => {
  const port = process.env.PORT ?? 9000;
  const server = Hapi.server({
    port,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  // controllers.forEach((controller) => server.route(controller));
  server.route(controllers);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
}

init();

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());
// app.use("/", controller);

// app.listen(port, () => {
//   console.log(`Server berjalan pada port ${port}...`);
// });
