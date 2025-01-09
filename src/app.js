const express=require("express");

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
  
//use bcrypt method for password

const app=express();


const auth=require('./middleware/auth');
const validation=require("./validation/validation");


const dbconnection=require("./database/db");

const User = require('./models/users');
const bcrypt=require("bcrypt");

// console.log(auth.middleware);
// console.log(dbconnection);


// Middleware to parse JSON body
app.use(express.json());
app.use(cookieParser());

const SECRET_KEY='shubhu022';


 // Import User model

// POST API to create a new user
app.post('/create',validation.validateUserInput, async (req, res) => {
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

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        let findUser = await User.findOne({ email: email }).exec();
        // console.log(findUser, "usersher");

        if (findUser) {
            // Compare password
            let ismatchPassword = await bcrypt.compare(password, findUser.password);
            if (ismatchPassword) {
                console.log("login successfully:");
                const {firstName,id}=findUser;
                const token = jwt.sign({firstName,id}, SECRET_KEY, { expiresIn: '1h' });

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
const varifyToken=(req,res,next)=> {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const user = jwt.verify(token, SECRET_KEY);
        if(user){
            req.user=user;
            next();
        }
        else{
            res.status(403).json({ message: 'user not fournd' });
        }
    } catch (err) {
        res.status(403).json({ message: 'Invalid or expired token!' });
    }
};
app.get("/profile",varifyToken,(req,res)=>{
      try{
        res.status(201).json({
            message: 'getting user successfully',
            user: req.user
        });
      }
      catch(err){
        res.send(err.message);
      }
});

app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.send({ message: 'Logged out successfully!' });
});



//get user list::

app.get("/getUsers",async (req,res)=>{  
    try {
      
        const userList =await User.find({});
        // await MyModel.find({});

        res.status(201).json({
            message: 'getting user successfully',
            user: userList
        });

    } catch (error) {
        res.status(400).json({ error: 'Error gettting user', details: error.message });
    }
})

//delete user::

app.post("/deleteUser", async (req,res)=>{
    const userId=req.body.userId;
    console.log("userId",userId);
    
    try{
       await User.findOneAndDelete({_id:userId}); 
       res.status(201).json({
        message: 'User Deleted successfully',
    });
    }
    catch (error) {
        res.status(400).json({ error: 'Error gettting user', details: error.message });
    }

})

//updating the users::

app.post("/updateUser", async (req,res)=>{
    const userInfo=req.body;
    console.log("userInfo",userInfo);
    const id=req.body._id;
    
    try{
        await User.findOneAndUpdate({ _id: id },userInfo);
        res.status(201).json({
        message: 'User updated successfully',
    });
    }
    catch (error) {
        res.status(400).json({ error: 'Error gettting user', details: error.message });
    }

})


const startServer=async ()=>{
    try{
        await dbconnection.connectToDatabase();
        console.log("Database connected successfully.");
        app.listen(4000,()=>{
            console.log("Server is successfully listing on port 4000....");
        });

    }
    catch(err){
        console.error("Failed to connect to the database:", err);
        process.exit(1); // Exit the process if DB connection fails
    }
}
startServer();


app.use("/",(req,res)=>{
    return  res.send("base url functionality::");
 })
//server listen

console.log("Creating project using mongodb,node.js and react.js ");  
