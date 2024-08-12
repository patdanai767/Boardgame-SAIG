import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    start: {
        type: Date,
        required:true
    },
    end: {
        type: Date,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    game: {
        type: String,
        required: true
    },
    tables: {
        type:[String],
    },
    totalAmount: {
        type: Number,
        required: true
    }
},{timestamps:true});

const BookingModel = mongoose.model("booking",bookingSchema);
export default BookingModel;