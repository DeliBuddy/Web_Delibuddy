const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt'); 
const User = require('./models/user');
const Seller = require('./models/seller');
const jwt= require('jsonwebtoken');
authRouter.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    const newUser = new Seller({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
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
      const passwordMatch = bcrypt.compare(password, temp.password);
      if (!passwordMatch) {
        
        return res.status(401).json({ error: 'Invalid password' });
      }
      // create a json web token


      // const token = await jwt.sign(
      //   { email: temp.email },
      //   "bisleri",
      //   { expiresIn: '1h' },
      // );
      res.status(200).json({ message: 'Login successful', user:temp});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while logging in' });
    }
  });

authRouter.get('/isTokenValid', async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const verified=jwt.verify(token,'bisleri');
    // console.log(verified);
    // { email: 'tm217@snu.edu.in', iat: 1694068205, exp: 1694071805 }
  
    if(!verified){
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const email=verified.email;

    const user = await User.findOne({email});
    const seller=await Seller.findOne({email});

    if (!user&&!seller) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    
    const temp=user?user:seller;
    
    res.status(200).json({ message: 'Token is valid', user:temp});
   }
   catch(error){
    res.status(401).json({ message: 'Unauthorized' });
   }  
  });

module.exports = authRouter;