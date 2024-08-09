import gameModel from '../models/gamelistModel.js';

export const getGames = async(req,res) => {
    try {
        const games = await gameModel.find();
        res.status(200).json(games);
    } catch (err) {
        next(err);
    }
}

export const createGame = async(req,res) => {
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