import express from "express";
import { createTable, updateTable, deleteTable, getTables, getTable } from "../controllers/TableController.js";
import { verifyAdmin } from "../middleware/validatetoken.js";
const router = express.Router();

//create
router.post("/:roomid", verifyAdmin, createTable);

//update
router.put("/:id", verifyAdmin, updateTable);

//delete
router.delete("/:id/:roomid", verifyAdmin, deleteTable);

//get & get all
router.get("/", getTables);
router.get("/:id", getTable);

export default router;