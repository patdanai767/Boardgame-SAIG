const mongoose = require('mongoose');

const category = new mongoose.Schema({
    catname: {
        type:String,
        required :true,
        unqiue: true
    },
    
})