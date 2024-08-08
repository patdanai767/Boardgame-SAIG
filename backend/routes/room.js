import express from "express";
import { createRoom,deleteRoom,updateRoom,getRoom,getRooms } from "../controllers/RoomController.js";
import { verifyAdmin } from "../middleware/validatetoken.js";
const router = express.Router();

//create room
router.post("/createRoom",verifyAdmin,createRoom);
//update room
router.put("/:id",verifyAdmin,updateRoom);
//delete room
router.delete("/:id",verifyAdmin,deleteRoom);
//GET room & rooms
router.get("/",getRooms);
router.get("/:id",getRoom);

export default router;