const express=require("express");

const app=express();

//reques handler
app.use((req,res)=>{
    res.send({'status':'success','msg':"successfully listening"});
})

//server listen
app.listen(4000,()=>{
    console.log("Server is successfully listing on port 4000....");
});
console.log("Creating project using mongodb,node.js and react.js ");  
