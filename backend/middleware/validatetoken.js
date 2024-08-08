import jwt from'jsonwebtoken';

/*export default {
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
}*/

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token)
        return next(createError(401, "You are not authenticated!"));

    jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
        if(err) return next(createError(403,"Token is not valid!"));
        req.user = user;
        next();
    });
}

export const verifyUser = (req,res,next) => {
    verifyToken(req,res,next, () => {
        if(req.user.id === req.params.id || req.user.role){
            next();
        } else {
            if(err) return next(createError(403,"You are not authorized!"));
        }
    })
}

export const verifyAdmin = (req,res,next) => {
    verifyToken(req,res,next, () => {
        if(req.user.role === "admin"){
            next();
        } else {
            if(err) return next(createError(403,"You are not authorized!"));
        }
    })
}