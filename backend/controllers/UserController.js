import UserModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import service from '../middleware/validatetoken.js';

export const register = async (req, res, next) => {
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

    } catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        const {email} = req.body;
        const user = await UserModel.findOne({ email });
        if (!email) {
            res.status(400);
            throw new Error("Please, fill all the mandatory!");
        }

        if (user && (await bcrypt.compare(req.body.password, user.password))) {
            const accesstoken = jwt.sign(
                {
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user._id,
                        role: user.role
                    }
                },
                process.env.JWT_SECRET, { expiresIn: "1hr" }
            );
            res.send({ token: accesstoken, message: 'success' });
        }

    } catch (err) {
        next(err)
    }
}

export const userInfo = async (req, res) => {
    try {
        const payload = jwt.decode(service.getToken(req));
        const user = await UserModel.findById(payload.user.id)

        res.send({ result: user, message: 'success' });
    } catch (err) {
        res.status(400);
        res.send({ message: err.message });
    }
}