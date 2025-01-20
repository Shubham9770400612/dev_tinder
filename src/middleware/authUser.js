const jwt = require('jsonwebtoken');
const SECRET_KEY='shubhu022';

const User = require('../models/users');
// const cookieParser = require('cookie-parser');

const varifyToken=(req,res,next)=> {
    const token = req.cookies.token;
    console.log(token,"token");


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const user = jwt.verify(token, SECRET_KEY);
        let findUser = User.findById({ _id: user.id });
        // console.log(findUser,"restgi");
        // console.log(user,"user here");
        
        if(user){
            req.user=user;
            req.userDetails=findUser; 
            next();
        }
        else{
            res.status(403).json({ message: 'user not fournd' });
        }
    } catch (err) {
        res.status(403).json({ message: 'Invalid or expired token!' });
    }
};

module.exports={varifyToken}