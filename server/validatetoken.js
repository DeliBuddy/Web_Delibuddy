const jwt = require('jsonwebtoken');

// Middleware to validate JWT token
const validateToken=(req, res, next)=> {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const verified= jwt.verify(token,'bisleri');
  

  if(!verified){
    return res.status(401).json({ message: 'Unauthorized' });
  }

    next();
  };


module.exports = {
  validateToken,
};
