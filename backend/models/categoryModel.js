import mongoose from "mongoose";

const catSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique: true
    }
},{timestamps:true});

const catModel = mongoose.model("Cat",catSchema);
export default catModel;