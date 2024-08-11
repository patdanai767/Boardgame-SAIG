import express from "express";
import { getCat,getCats,deleteCat,createCat,updateCat } from "../controllers/CatController.js";
import { verifyAdmin } from "../middleware/validatetoken.js";

const router = express.Router();

//create
router.post("/createCat", verifyAdmin, createCat);

//update
router.put("/:id", verifyAdmin, updateCat);

//delete
router.delete("/:id", verifyAdmin, deleteCat);

//get & get all
router.get("/", getCats);
router.get("/:id", getCat);

export default router;