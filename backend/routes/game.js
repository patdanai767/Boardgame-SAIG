import express from "express";
import { getGames,createGame,updateGame, deleteGame, getGame, updateCat} from "../controllers/GameController.js";
import upload from "../middleware/upload.js";
import {verifyAdmin} from "../middleware/validatetoken.js";

const router = express.Router();

//create game
router.post('/createGame', function(req,res){
    upload;
    verifyAdmin;
    createGame;
});
//update game
router.put("/:id",verifyAdmin,updateGame);
router.put("/:id/:catid",verifyAdmin,updateCat);
//delete game
router.delete("/:id",verifyAdmin,deleteGame);

router.get('/',getGames);
router.get('/:id',getGame);


export default router;