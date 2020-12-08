import express from "express";
import { routes } from "./routes";
import "reflect-metadata";
import cors from 'cors';
import BodyParser from "body-parser";
import path from 'path';

import "./database";

const app = express();


app.use(express.json());
app.use(cors());

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.listen(3333, () => {
  console.log("Servidor ligado na 3333");
});



