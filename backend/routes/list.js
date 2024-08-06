import express from "express";
import { list,add } from "../controllers/GameController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get('/list',list);
router.post('/add', function(req,res){
    upload;
    add;
});


export default router;