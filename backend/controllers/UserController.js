const express = require('express');
const app = express();
const Service = require('./service');
const UserModel = require('../models/userModel');

app.post('/user/register', async(req,res) => {
    try {
        const payload = await new UserModel(req.body).save();
        res.send({message:'success', payload:payload});
        
    } catch (error) {
        console.log(error)
        res.statusCode = 500;
        res.send(error);
    }
})

module.exports = app;