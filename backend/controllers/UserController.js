import UserModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
// import service from '../middleware/validatetoken.js';

//Register api
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

//Login api
export const login = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });
        if (!email) {
            res.status(400);
            throw new Error("Please, fill all the mandatory!");
        }
        const comparePassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!comparePassword)
            return next(createError(400, "Wrong password or Email"));
        const token = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET
        )

        const { password, isAdmin,...otherDetails } = user._doc;
        res
            .cookie("access_token", token, {
                httpOnly: true
            })
            .status(200)
            .json({ result: { ...otherDetails}, isAdmin})

    } catch (err) {
        next(err)
    }
}

export const getUsers = async(req,res) => {
    try {
        const AllUser = await UserModel.find();
        res.status(200).json(AllUser);
    } catch (err) {
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Table has been deleted.")
    } catch (err) {
        next(err);
    }
}