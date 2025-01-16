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
const authRoute=require("./route/auth")

// console.log(auth.middleware);
// console.log(dbconnection);


// Middleware to parse JSON body
app.use(express.json());
app.use(cookieParser());

const varifyToken=require("./middleware/authUser");
console.log(varifyToken,"varifytoken");


const SECRET_KEY='shubhu022';


 // Import User model

// POST API to create a new user
app.use("/",authRoute);

app.get("/profile",varifyToken.varifyToken,(req,res)=>{
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


app.post("/sentConnectionResquest",varifyToken.varifyToken,(req,res)=> {
    console.log("Connection is established");
    const user=req.user;
    console.log(user,"line number 120");
    
    res.send(`${user.firstName} user send the request:`);
})

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
