const mongoose = require('mongoose');

const gamelist = new mongoose.Schema({
    gamename: {
        type: String,
        required:true,
        unqiue:true
    },
    gamecode: {
        type: String
    },
    gamecat: {
        type: String
    }
},{timestamps:true});

const gameModel = mongoose.model('gamelist',gamelist);
module.exports = gameModel;

