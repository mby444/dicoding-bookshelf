import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import controller from "../controller/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 9000;

app.use(cors());
app.use(bodyParser.json());
app.use("/", controller);

app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}...`);
});
