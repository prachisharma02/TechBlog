import express from "express";
import Signup from "../controller/userapi.js";
const route = express.Router();
route.post("/signup", Signup);
export default route;
