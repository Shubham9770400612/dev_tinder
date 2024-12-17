
// const mongoose = require('mongoose');
// const url='mongodb+srv://shubham123:g39xwBOQRtJhRAec@cluster0.dleqnlm.mongodb.net/test?retryWrites=true&w=majority'
// const connection=mongoose.connect(url)
//     .then(() => {
//         console.log('Connected to MongoDB successfully!');
//     })
//     .catch((error) => {
//         console.error('Error connecting to MongoDB:', error);
//     });

// module.exports={connection}    

//new code handle asyncromous programing

const mongoose = require("mongoose");

const url = 'mongodb+srv://shubham123:g39xwBOQRtJhRAec@cluster0.dleqnlm.mongodb.net/dev_tinder?retryWrites=true&w=majority';

// Export a function to establish the database connection
const connectToDatabase = async () => {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Re-throw the error to handle it in the app
    }
};

module.exports = {connectToDatabase};
