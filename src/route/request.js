const express=require("express");
const router = express.Router();
const {varifyToken}=require("../middleware/authUser");

const Request=require("../models/sendRequest");
const User=require("../models/users");


router.post("/request/ConnectionRequest/:status/:userId", varifyToken, async (req, res) => {
    try {
        const status = req.params.status;
        const toUserId = req.params.userId;
        const fromUserId = req.user.id;

        // console.log("Status:", status, "To User ID:", toUserId);

        // Allowed status values
        const allowedStatus = ["interest", "notinterest"];

        // Validate status
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status provided." });
        }

        // Prevent self-request
        if (toUserId === fromUserId) {
            return res.status(400).json({ message: "You cannot send a request to yourself." });
        }

        // Check if a request already exists between these users
        const isRequestExist = await Request.findOne({
            $or: [
                { fromUserId: fromUserId, toUserId: toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        console.log("Existing Request:", isRequestExist);

        if (isRequestExist) {
            return res.status(409).json({ message: "Connection request already exists." });
        }

        // Create a new request
        const newRequest = new Request({
            fromUserId: fromUserId,
            toUserId: toUserId,
            status: status
        });

        const savedRequest = await newRequest.save();

        if (!savedRequest) {
            throw new Error("Failed to save request.");
        }

        return res.status(201).json({
            message: "Your request has been sent successfully.",
            detail: savedRequest
        });

    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ message: `Something went wrong: ${error.message}` });
    }
});

module.exports=router;