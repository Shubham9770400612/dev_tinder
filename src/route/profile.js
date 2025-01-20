const express=require("express");
const router = express.Router();
const {varifyToken}=require("../middleware/authUser");
const {ProfileDataValid}=require("../validation/validation");
const { check } = require("express-validator");
router.get("/profile",varifyToken,(req,res)=>{
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

router.patch("/profile/view/edit",varifyToken,async (req,res)=>{
    try{
      const valid=await ProfileDataValid(req);
      if(!valid){
        res.send("data is not correct");
        // throw Error("data is not valid ");
      }
      const user=await req.userDetails;
      const update=req.body;
      // console.log(" before user",user);
      // console.log("update data",update);
      // Object.keys(update).forEach((key)=>user[key]==update[key]);
      Object.keys(update).forEach((key) => {
        user[key]=update[key];
    });      
     user.save();
     res.send("profile updated successfully::");
    }
    catch(err){
       res.send("working on edit profile data",err);
    }
})


router.post("/sentConnectionResquest",varifyToken,(req,res)=> {
    console.log("Connection is established");
    const user=req.user;
    console.log(user,"line number 120");
    
    res.send(`${user.firstName} user send the request:`);
})

module.exports=router;