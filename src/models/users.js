const mongoose = require('mongoose');

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

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
