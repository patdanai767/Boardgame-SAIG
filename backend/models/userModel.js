const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, //when there are updated or saved, it will remove automatically
        required: [true, "Don't forget add a Name"],
        maxlength: 32
    },

    email: {
        type: String,
        trim: true,
        required: [true, "Don't forget add a E-mail"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please, add a valid E-mail'
        ]
    },

    password: {
        type: String,
        trim: true,
        required: [true, "Don't forget add a Password"],
        minlength: [6, "Password must have at least 6 characters"],
        match: [
            /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
            'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters'
        ]
    },

    role: {
        type: Number,
        default: 0
    },
}, { timestamps: true });
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;