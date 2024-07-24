const express = require('express');
const app = express();
const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const service = require('../middleware/validatetoken');

app.post('/user/register', async (req, res) => {
    try {
        const { email } = req.body;
        const userExist = await UserModel.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User already exist." });
        } else {
            const hashPassword = await bcrypt.hash(req.body.password, 10);
            const user = ({
                username: req.body.username,
                email: req.body.email,
                password: hashPassword
            });
            const userData = new UserModel(user);
            console.log(userData);
            const savedUser = await userData.save();
            res.status(200).json({ message: "success", savedUser });
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
            res.send({ token: accesstoken, message: 'success' });
        }

    } catch (error) {
        res.statusCode = 401;
        throw new Error("Email or Password is not valid");
    }
})

app.get('/user/info', service.isLogin, async (req, res) => {
    try {
        const payload = jwt.decode(service.getToken(req));
        const user = await UserModel.findById(payload.user.id)

        res.send({ result: user, message: 'success' });
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
})

module.exports = app;