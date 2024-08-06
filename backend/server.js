import express from'express';
import cors from'cors';
import mongoose from'mongoose';
import bodyParser from'body-parser';
import dotenv from "dotenv"
import authRoute from "./routes/auth.js"
import gameRoute from "./routes/list.js"

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true})); //2
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));

try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb is connected")
} catch (error) {
    console.log(error)
}

app.use("/api/auth", authRoute);
app.use("/api/game", gameRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`Server is running on Port : ${port}`)
})