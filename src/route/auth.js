const express=require("express");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

//use bcrypt method for password

const router = express.Router();
const auth=require('../middleware/auth');
const validation=require("../validation/validation");
const User = require('../models/users');
const bcrypt=require("bcrypt");



router.post('/create',validation.validateUserInput, async (req, res) => {
    try {
        let hashpassword=await bcrypt.hash(req.body.password,10);
        req.body.password=hashpassword;

        console.log("line number 31",req.body)
        const saveUser=new User(req.body)
        // Save the user to the database
        const savedUser = await saveUser.save();

        res.status(201).json({
            message: 'User created successfully',
            user: savedUser
        });

    } catch (error) {
        res.status(400).json({ error: 'Error creating user', details: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        let findUser = await User.findOne({ email: email }).exec();
        // console.log(findUser, "usersher");

        if (findUser) {
            // Compare password
            // let ismatchPassword = await bcrypt.compare(password, findUser.password);
            let ismatchPassword = await findUser.checkPassword(password);
            if (ismatchPassword) {
                console.log("login successfully:");
                // const {firstName,id}=findUser;
                // const token = jwt.sign({firstName,id}, SECRET_KEY, { expiresIn: '1h' });
                const token=await findUser.getJwtToken();

                // Set JWT as HTTP-only cookie
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: true, // Set true in production if using HTTPS
                        sameSite: 'strict',
                    });
                
                return res.status(200).json({
                    message: 'Login successfully'
                });
            } else {
                console.log("password is invalid:");
                
                return res.status(201).json({
                    message: 'Password is wrong'
                });
            }
        } else {
            return res.status(201).json({
                message: 'Email id does not exist'
            });
        }
    } catch (error) {
        return res.status(400).json({
            error: 'Error during login',
            details: error.message
        });
    }
});


router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.send({ message: 'Logged out successfully!' }); 
});

module.exports=router 