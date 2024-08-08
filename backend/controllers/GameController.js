import gameModel from '../models/gamelistModel.js';

export const getGames = async(req,res) => {
    try {
        const gameList = await gameModel.find();
        res.send({ result: gameList, message: 'success' });
    } catch (err) {
        res.status(404).json({ message: err })
    }
}

export const createGame = async(req,res) => {
    try {
        const { gamename } = req.body;
        const gameExist = await gameModel.findOne({ gamename })
        if (gameExist) {
            return res.status(400).json({ message: "Game already exist." });
        } else {
            const game = new gameModel({
                gamename: req.body.gamename,
                genre: req.body.genre,
                year: req.body.year
            });
            if (req.file) {
                game.img = req.file.path
            }
            console.log(game)
            const saveGame = await game.save();
            res.status(200).json({ message: "success", saveGame });
        }
    } catch (error) {
        res.status(401).json("Unauthorized");
    }
}