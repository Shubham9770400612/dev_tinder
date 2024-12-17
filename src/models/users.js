const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        default: "John" // Default value if not provided
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
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets the current date
    }
});

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
