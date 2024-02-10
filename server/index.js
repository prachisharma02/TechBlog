import express from "express";
import dotenv from "dotenv";
import Connection from "./database/db.js";
dotenv.config();
const app = express();
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`server is running at port  ${PORT}`);
});
Connection();
