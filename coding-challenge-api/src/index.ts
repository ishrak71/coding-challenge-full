import express, { Request, Response } from "express";

import cors from "cors";
import { getUser } from "./user";
import { getData } from "../src/controller/dataController";

const app = express();
const port = 8080;

app.use(cors());

app.get("/user", getUser);

app.get("/sales", getData);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
