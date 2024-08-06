import jwt from'jsonwebtoken';

export default {
    getToken: (req) => {
        return req.headers.authorization.replace('Bearer ', '');
    },
    isLogin: (req, res, next) => {
        require('dotenv').config();
        let authHeader = req.headers.Authorization || req.headers.authorization;
        if(authHeader && authHeader.startsWith('Bearer ')){
            let token = authHeader.replace('Bearer ', '');
            const key = process.env.JWT_SECRET;
    
            try {
                const verify = jwt.verify(token,key);
                if(verify != null){
                    next();
                }
            } catch (error) {}
        }else{
            res.status(401);
            res.send("User is not authorized");
        }
    }
}
