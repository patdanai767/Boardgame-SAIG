import catModel from "../models/categoryModel.js";
import gameModel from "../models/gamelistModel.js";

export const createCat = async (req, res, next) => {
    try {
        const { title } = req.body;
        const catExist = await catModel.findOne({ title });
        if (catExist) {
            return res.status(400).json({ message: "Category already exist." });
        } else {
            const newCat = new catModel(req.body);
            const saveCat = await newCat.save();
            res.status(200).json(saveCat);
        }
    } catch (err) {
        next(err);
    }
}

export const updateCat = async (req, res, next) => {

    try {
        const updatedCat = await catModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedCat);
    } catch (err) {
        next(err);
    }
}

export const deleteCat = async (req, res, next) => {
    const gameId = req.params.gameid;
    try {
        await catModel.findByIdAndDelete(req.params.id);
        try {
            await gameModel.findByIdAndUpdate(gameId, {
                $pull: { cats: req.params.id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Cat has been deleted.")
    } catch (err) {
        next(err);
    }
}

export const getCats = async (req, res, next) => {
    try {
        const showCats = await catModel.find();
        res.status(200).json(showCats);
    } catch (err) {
        next(err);
    }
}

export const getCat = async (req, res, next) => {
    try {
        const showCat = await catModel.findById(req.params.id);
        res.status(200).json(showCat);
    } catch (err) {
        next(err);
    }
}