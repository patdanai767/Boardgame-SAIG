import tableModel from "../models/tableModel.js";
import roomModel from "../models/roomModel.js";
import { createError } from "../middleware/error.js";

export const createTable = async (req, res, next) => {
    const newTable = new tableModel(req.body);
    const roomId = req.params.roomid;

    try {
        const saveTable = await newTable.save();
        try {
            await roomModel.findByIdAndUpdate(roomId, {
                $push: { tables: saveTable._id},
            })
        } catch (err) {
            next(err);
        }
        res.status(200).json(saveTable);
    } catch (err) {
        next(err);
    }
}

export const updateTable = async (req, res, next) => {

    try {
        const updatedTable = await tableModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedTable);
    } catch (err) {
        next(err);
    }
}

export const deleteTable = async (req, res, next) => {
    const roomId = req.params.roomid;
    try {
        await tableModel.findByIdAndDelete(req.params.id);
        try {
            await roomModel.findByIdAndUpdate(roomId, {
                $pull: { tables: req.params.id},
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Table has been deleted.")
    } catch (err) {
        next(err);
    }
}

export const getTables = async (req, res, next) => {
    try {
        const showTables = await tableModel.find();
        res.status(200).json(showTables);
    } catch (err) {
        next(err);
    }
}

export const getTable = async(req,res, next) => {
    try {
        const showTable = await tableModel.findById(req.params.id);
        res.status(200).json(showTable);
    } catch (err) {
        next(err);
    }
}