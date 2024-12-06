const express=require("express");

const app=express();

//reques handler

app.use("/test/1",(req,res)=>{
    res.send({'status':'success','msg':"successfully get msg id which 4"});
})
//manage routs in express::
app.use("/test",(req,res)=>{
    res.send({'status':'success','msg':"successfully listening"});
})


app.use("/",(req,res)=>{
    res.send("base url functionality::");
})


//server listen
app.listen(4000,()=>{
    console.log("Server is successfully listing on port 4000....");
});
console.log("Creating project using mongodb,node.js and react.js ");  
