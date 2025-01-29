const mongoose=require("mongoose");

const sendRequest= new mongoose.Schema({
  fromUserId:{
    type:mongoose.Schema.Types.ObjectId,
    require:true
  },
  toUserId:{
    type:mongoose.Schema.Types.ObjectId,
    require:true
  },
  status:{
    type:String,
    enum: ['interest', 'notinerest', 'accept','reject']  },
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets the current date
    }

    // timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
}
);

const Request=mongoose.model("Request",sendRequest);

module.exports=Request