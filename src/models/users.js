const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const SECRET_KEY='shubhu022';
const bcrypt=require("bcrypt");



// Define User Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        // default: "John" 
        // Default value if not provided
    },
    lastName: {
        type: String,
        required: true,
        default: "Doe" // Default value if not provided
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures no duplicate emails
    },
    password: {
        type: String,
        required: true
    },
    age:{
        type:Number,
        required:true,
        min: [6, 'Must be at least 6, got {VALUE}']
        // max:[100,'Must be at least 04 between 100']
    },
    hobbies:{
        type:String,
        enum: {
            values: ['Coffee', 'Tea']
          }
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets the current date
    }
});

//here is functionality of mogoose schema method that help you to more easy way to make common fucntionalify::
userSchema.methods.getJwtToken=async function(){
    const user=this;
    const {firstName,id}=user;
     const token=await jwt.sign({firstName,id}, SECRET_KEY, { expiresIn: '1h' });
     return token
    
}

userSchema.methods.checkPassword=async function(password){
    const user=this;
    const validPassword= await bcrypt.compare(password, user.password);
    return validPassword;
    
}

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
