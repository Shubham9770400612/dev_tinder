const middleware = (req, res, next) => {
    const token = 'xyz123';       // Mock token (replace with actual token validation logic)
    const validValue = 'xyz123'; // Expected valid token value
    
    if (token === validValue) {
        console.log('Token validated successfully.');
        next(); // Pass control to the next middleware or route handler
    } else {
        console.log('Token validation failed.');
        res.status(403).json({ error: 'Unauthorized access' }); // Respond with an error
    }
};

module.exports={middleware}