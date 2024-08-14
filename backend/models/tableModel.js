import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
        },
        capacity: {
            type: Number,
        },
        tableNumbers: [
            {
                number: Number, 
                unavailableDates: {type: [Date]}
            }
        ],
    },
    {timestamps: true}
);
const tableModel = mongoose.model("Table", tableSchema);
export default tableModel;