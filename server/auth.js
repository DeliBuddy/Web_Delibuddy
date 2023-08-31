const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt'); 
const User = require('./models/user');
const Seller = require('./models/seller');

authRouter.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log(newUser);
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while registering user' });
  }
});


authRouter.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({email});
      const seller=await Seller.findOne({email});

      if (!user&&!seller) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      
      // Compare passwords
      const temp=user?user:seller;
      const passwordMatch = await bcrypt.compare(password, temp.password);
      if (!passwordMatch) {
        
        return res.status(401).json({ error: 'Invalid password' });
      }
     
      res.status(200).json({ message: 'Login successful', user:temp});
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while logging in' });
    }
  });


module.exports = authRouter;