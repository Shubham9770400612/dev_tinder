const express=require("express");
const router = express.Router();
const {varifyToken}=require("../middleware/authUser");
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


router.post("/sentConnectionResquest",varifyToken,(req,res)=> {
    console.log("Connection is established");
    const user=req.user;
    console.log(user,"line number 120");
    
    res.send(`${user.firstName} user send the request:`);
})

module.exports=router;