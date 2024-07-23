const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true})); //2
app.use(bodyParser.json());

try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb is connected")
} catch (error) {
    console.log(error)
}

app.use(require('./controllers/UserController'));

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`Server is running on Port : ${port}`)
})