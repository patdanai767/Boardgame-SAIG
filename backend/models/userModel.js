import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Don't forget add a Name"],
        maxlength: 32
    },

    email: {
        type: String,
        required: [true, "Don't forget add a E-mail"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please, add a valid E-mail'
        ]
    },

    password: {
        type: String,
        required: [true, "Don't forget add a Password"],
        minlength: [6, "Password must have at least 6 characters"]
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);
export default userModel;