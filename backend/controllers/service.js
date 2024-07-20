const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = {
    getToken: (req) => {
        return req.headers.authorization.replace('Bearer ', '');
    },
    isLogin: (req, res, next) => {

        if (req.headers.authorization != null) {

            const token = req.headers.authorization.replace('Bearer ', '');
            const key = process.env.JWT_SECRET;

            try {
                const verify = jwt.verify(token, key)
                if (verify != null) {
                    next();
                }
            } catch (e) { }

        } else {
            return res.send('FAILED AUTHORIZATION');
        }
    },
    getMemberId: (req, res) => {

        const token = req.headers.authorization.replace('Bearer ', '');
        const payLoad = jwt.decode(token);
        return payLoad.id;
    },
    getAdminId: (req, res) => {

        const token = req.headers.authorization.replace('Bearer ', '');
        const payLoad = jwt.decode(token);
        return payLoad.id;
    }
}