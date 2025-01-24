const express=require("express");
const cookieParser = require('cookie-parser');

//use bcrypt method for password
const app=express();
const dbconnection=require("./database/db");
const authRoute=require("./route/auth");
const profileRoute=require("./route/profile");

const request=require("./route/request");

// console.log(auth.middleware);
// console.log(dbconnection);


// Middleware to parse JSON body
app.use(express.json());
app.use(cookieParser());
 // Import User model

// POST API to create a new user
app.use("/",authRoute);
app.use("/",profileRoute);
app.use("/",request);




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
