const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt'); 
const UserModel = require('./models/user'); 

// POST route to register a new user
authRouter.post('/register', async (req, res) => {
  try {
    const { name, snuId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    const newUser = new UserModel({
      name,
      snuId,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while registering user' });
  }
});

authRouter.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find the user by snuId
      const user = await UserModel.findOne({snuId:email});
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        
        return res.status(401).json({ error: 'Invalid password' });
      }
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while logging in' });
    }
  });


module.exports = authRouter;