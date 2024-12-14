
const mongoose = require('mongoose');
// const uri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority'; // For MongoDB Atlas

const url='mongodb+srv://shubham123:g39xwBOQRtJhRAec@cluster0.dleqnlm.mongodb.net/test?retryWrites=true&w=majority'
// Connect to MongoDB
const connection=mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB successfully!');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

module.exports={connection}    