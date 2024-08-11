import gameModel from '../models/gamelistModel.js';

export const createGame = async (req, res) => {
    try {
        const { gamename } = req.body;
        const gameExist = await gameModel.findOne({ gamename })
        if (gameExist) {
            return res.status(400).json({ message: "Game already exist." });
        } else {
            const game = new gameModel(req.body);
            if (req.file) {
                game.img = req.file.path
            }
            const saveGame = await game.save();
            res.status(200).json({ message: "success", saveGame });
        }
    } catch (err) {
        next(err);
    }
}

export const updateGame = async (req, res, next) => {
    try {
        const updatedGame = await gameModel.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedGame);
    } catch (err) {
        next(err);
    }
}

export const updateCat = async (req, res, next) => {
    const catId = req.params.catid;
    try {
        const updatedCat = await gameModel.findByIdAndUpdate(req.params.id,
            { $addToSet: { cats: catId } },
            { new: true }
        );
        res.status(200).json(updatedCat);
    } catch (err) {
        next(err);
    }
}

export const deleteGame = async (req, res, next) => {
    try {
        await gameModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Game has been deleted.");
    } catch (err) {
        next(err);
    }
}

export const getGame = async (req, res, next) => {
    try {
        const showGame = await gameModel.findById(req.params.id);
        res.status(200).json(showGame);
    } catch (err) {
        next(err);
    }
}

export const getGames = async (req, res, next) => {
    try {
        const showGames = await gameModel.find();
        res.status(200).json(showGames);
    } catch (err) {
        next(err);
    }
}