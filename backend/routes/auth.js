import express from "express";
import {register, login, userInfo} from "../controllers/UserController.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/infoUser",userInfo);

export default router;