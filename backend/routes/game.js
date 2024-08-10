import express from "express";
import { getGames,createGame,updateGame, deleteGame, getGame } from "../controllers/GameController.js";
import upload from "../middleware/upload.js";
import {verifyAdmin} from "../middleware/validatetoken.js";

const router = express.Router();

//create room
router.post("/createGame",verifyAdmin,createGame);
//update room
router.put("/:id",verifyAdmin,updateGame);
//delete room
router.delete("/:id",verifyAdmin,deleteGame);

router.get('/',getGames);
router.get('/:id',getGame);
router.post('/create', function(req,res){
    upload;
    createGame;
});


export default router;