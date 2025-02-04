const express=require("express");
const router = express.Router();
const {varifyToken}=require("../middleware/authUser");

const Request=require("../models/sendRequest");

router.get("/users/getConnectionList", varifyToken, async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch user connections
        const userConnection = await Request.find({
            status: 'accept',
            $or: [{ fromUserId: userId }, { toUserId: userId }]
        })
        .select('_id status') // Select only necessary fields
        .populate('fromUserId', 'firstName lastName email age') 
        .populate('toUserId', 'firstName lastName email age');

        console.log("User Connections Fetched:", userConnection);

        // Format response data
        const formattedData = userConnection.map(connection => {
            if (connection.fromUserId._id.toString() === userId) {
                return connection.toUserId; // Return toUserId if userId matches fromUserId
            } else {
                return connection.fromUserId; // Otherwise, return fromUserId
            }
        });

        console.log("Formatted Connection List:", formattedData);

        // Send formatted data as API response
        res.status(200).json({ success: true, connections: formattedData });

    } catch (error) {
        console.error("Error in fetching user connections:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


module.exports=router;