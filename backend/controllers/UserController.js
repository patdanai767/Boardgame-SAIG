const express = require('express');
const app = express();
const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const service = require('../middleware/validatetoken');

app.post('/user/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400);
            throw new Error("Please, fill all the mandatory!");
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await UserModel.create({
                username,
                email,
                password: hashPassword
            })
                console.log(`User created ${user}`)
                res.status(201).json({ _id: user.id, email: user.email })
        }

    } catch (error) {
        res.statusCode = 400;
        res.send({ message: error });
    }
})

app.post('/user/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email, !password) {
            res.status(400);
            throw new Error("Please, fill all the mandatory!");
        }

        const user = await UserModel.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const accesstoken = jwt.sign(
                {
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user.id
                    }
                },
                process.env.JWT_SECRET, { expiresIn: "1hr" }
            );
            res.send({token : accesstoken, message: 'success'});
        }

    } catch (error) {
        res.statusCode = 401;
        throw new Error("Email or Password is not valid");
    }
})

app.get('/user/info',service.isLogin, async(req,res) => {
    try{
        const payload = jwt.decode(service.getToken(req));
        const user = await UserModel.findById(payload.user.id)

        res.send({result:user, message : 'success'});
    }catch(err){
        res.status(400);
        res.send({message: err.message});
    }
})

module.exports = app;