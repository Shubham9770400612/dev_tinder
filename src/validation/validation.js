const validator=require('validator');

// Custom validation middleware
const validateUserInput = (req, res, next) => {
    const { firstName, email } = req.body;
    const errors = [];
  
    // First name validation
    if (!firstName || validator.isEmpty(firstName.trim())) {
      errors.push({ field: 'firstName', message: 'First name is requiredfgfdg' });
    } else if (!validator.isAlpha(firstName.trim())) {
      errors.push({ field: 'firstName', message: 'First name must only contain letters' });
    }
  
    // Email validation
    if (!email || validator.isEmpty(email.trim())) {
      errors.push({ field: 'email', message: 'Email is required' });
    } else if (!validator.isEmail(email.trim())) {
      errors.push({ field: 'email', message: 'Enter a valid email address' });
    }
  
    // Check for errors
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
  
    next();
  };

  module.exports={validateUserInput}