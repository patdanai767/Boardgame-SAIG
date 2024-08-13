import express from "express";
import {register, login, getUsers, deleteUser} from "../controllers/UserController.js";
import {verifyAdmin} from "../middleware/validatetoken.js"

const router = express.Router();

router.get("/",verifyAdmin,getUsers);
router.post("/register",register);
router.post("/login",login);
router.delete("/:id",verifyAdmin,deleteUser);

export default router;