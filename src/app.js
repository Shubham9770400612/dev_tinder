const express=require("express");
  
const app=express();

const auth=require('./middleware/auth');

const dbconnection=require("./database/db");

const User = require('./models/users');

// console.log(auth.middleware);
// console.log(dbconnection);


// Middleware to parse JSON body
app.use(express.json());


 // Import User model

// POST API to create a new user
app.post('/create', async (req, res) => {
    try {
        const newUser = new User({
            firstName: "Shubham12",
            lastName: "Dudhe12",
            email: "dudheshubham6127@yopmail.com",
            password: "J12h@123"
        });


        // Save the user to the database
        const savedUser = await newUser.save();

        res.status(201).json({
            message: 'User created successfully',
            user: savedUser
        });

    } catch (error) {
        res.status(400).json({ error: 'Error creating user', details: error.message });
    }
});


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
