const express=require("express");
const router = express.Router();
const {varifyToken}=require("../middleware/authUser");

const Request=require("../models/sendRequest");


router.post("/request/sentConnectionResquest/:status/:userId",varifyToken, async (req,res)=>{
    try{
        const status= req.params.status;
        const ToUserId=req.params.userId;
        const fromUserId=req.user.id;
        console.log("status",status,"ToUserId",ToUserId);
        // res.send("working on this tickest bhia");
        const insertArray={
            "fromUserId":fromUserId,
            "toUserId":ToUserId,
            "status":status
        }
        const saveRequestatus=new Request(insertArray)
            // Save the user to the database
        const saveInfo = await saveRequestatus.save();
        if(saveInfo){
            res.status(201).json({
                message: 'Your Request send successfully',
                detail: saveInfo
            });
        }
        else{
            throw new Error("your data that you try to store is wrong::");
        }

    }
    catch(error){
        res.send(`something wrong ${error.message}`)
    }
})

module.exports=router;