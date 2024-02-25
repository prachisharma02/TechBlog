import express from "express";
import Signup from "../controller/userapi.js";
import { loginUser } from "../controller/userapi.js";
const route = express.Router();
route.post("/signup", Signup);
route.post("/login", loginUser);

export default route;
