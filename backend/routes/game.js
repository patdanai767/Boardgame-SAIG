import express from "express";
import { getGames,createGame } from "../controllers/GameController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get('/',getGames);
router.post('/create', function(req,res){
    upload;
    createGame;
});


export default router;