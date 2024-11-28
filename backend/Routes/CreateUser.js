const express = require('express')
const router = express.Router()
const User = require('../models/User.js')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const jwtSecret = "MyNameisHetsuthar"
router.post('/createuser', 
  [  body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    // password must be at least 5 chars long
    body("password",'password must be 5 char').isLength({ min: 5 })
]
    ,async(req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
     
     // Check if user already exists in the database    
     const userExists = await User.findOne({ email: req.body.email })
     if (userExists) {
        return res.status(409).json({ message: 'User already exists' })
     }
     const salt  = await bcrypt.genSalt(10)

     let secPassword = await bcrypt.hash(req.body.password,salt)
     // Create a new user
     const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: secPassword,
      location: req.body.location // Save the hashed password
    });

     await user.save()
     
     res.status(201).json({ message: 'User created successfully' })


})


//login 

router.post('/login', 
  [  body('email').isEmail(),
    body("password", 'password must be 5 char').isLength({ min: 5 })
  ], async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });

      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare the provided password with the stored hashed password
      const pwdCompare = await bcrypt.compare(password, user.password);

      // Check if password matches
      if (!pwdCompare) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      // Password is correct, generate JWT token
      const data = {
        user: {
          id: user.id
        }
      };

      const authToken = jwt.sign(data, jwtSecret, { expiresIn: '1h' }); // Optional: Set expiration time for the token

      // Send response with token
      return res.json({
        success: true,
        message: 'Login successful',
        authToken: authToken // Return the generated JWT token
      });
    } catch (error) {
      // Catch any unexpected errors and respond with a server error
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });


module.exports = router;