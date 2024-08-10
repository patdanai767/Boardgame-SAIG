import mongoose from 'mongoose';

const gamelist = new mongoose.Schema({
    gamename: {
        type: String,
        required: true,
        unqiue: true
    },
    img: {
        type: String,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    desc: {
        type: String
    },
    rooms: {
        type: [String]
    }
}, { timestamps: true });

const gameModel = mongoose.model('gamelist', gamelist);
export default gameModel;

