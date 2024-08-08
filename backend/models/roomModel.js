import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    tables: {
        type: [String]
    },
    desc: {
        type:String
    }
})

const roomModel = mongoose.model("Room",RoomSchema);
export default roomModel;