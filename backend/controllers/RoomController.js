import roomModel from "../models/roomModel.js";
import tableModel from "../models/tableModel.js";
import { createError } from "../middleware/error.js";

export const createRoom = async (req, res, next) => {
    const newRoom = new roomModel(req.body);
    try {
        const savedRoom = await newRoom.save();
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err);
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await roomModel.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
}

export const deleteRoom = async(req,res,next) => {
    try {
        await roomModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Room has been deleted.");
    } catch (err) {
        next(err);
    }
}

export const getRoom = async(req,res,next) => {
    try {
        const showRoom = await roomModel.findById(req.params.id);
        res.status(200).json(showRoom);
    } catch (err) {
        next(err);
    }
}

export const getRooms = async(req,res,next) => {
    try {
        const showRooms = await roomModel.find();
        res.status(200).json(showRooms);
    } catch (err) {
        next(err);
    }
}

export const getTableRooms = async(req,res,next) => {
    try {
        const room = await roomModel.findById(req.params.id);
        const list = await Promise.all(room.tables.map((table) =>{
            return tableModel.findById(table);
        })
    );
    res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}