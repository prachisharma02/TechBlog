import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Connection from "./database/db.js";
import Route from "./Routes/route.js";
import BodyParser from "body-parser";
dotenv.config();
const app = express();
app.use(cors);
app.use(BodyParser.json({ extended: true }));
app.use(BodyParser.urlencoded({ extended: true }));

app.use("/", Route);
//middleware communicates with the router and routes itself using the express middleware interface between requests and responses
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`server is running at port  ${PORT}`);
});
Connection();
