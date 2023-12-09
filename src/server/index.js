import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import router from "../controller/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 9000

app.use(bodyParser.json());
app.use("/", router);

app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}...`);
});