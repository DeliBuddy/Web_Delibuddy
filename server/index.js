const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3696;
const cors = require("cors");
const app = express();
app.use(cors());
const http = require('http');
const server = http.createServer(app);
const {validateToken} = require('./validatetoken');
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//const DB = "mongodb+srv://dgdevanshi:medibuddy@medibuddycluster.bk3xmrr.mongodb.net/?retryWrites=true&w=majority"
const DB = "mongodb+srv://tm217:Tushar16@cluster0.aqzeo9l.mongodb.net/?retryWrites=true&w=majority"


const authRouter = require("./auth");

// const jwt = require('jsonwebtoken');

// // Middleware to validate JWT token
// const validateToken=(req, res, next)=> {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   const verified=jwt.verify(token,'bisleri');

//   if(!verified){
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
//   //req.user=verified.user;
//     // Store the user data from the token in the request
//     next();
//   };


// module.exports = {
//   validateToken,
// };

//add the middleware for the above code


const orderRouter = require("./order");
const partnerRouter = require("./partner");
const sellerRouter =require("./seller");
const chatRouter = require("./chat");
// middleware

app.use(express.json());

app.set('io', io);
app.use("/auth", authRouter);

app.use(validateToken);
app.use("/order", orderRouter);
app.use("/partner", partnerRouter);
app.use("/seller",sellerRouter);
app.use("/chat",chatRouter);

// Connections
mongoose.set("strictQuery", false);
mongoose
    .connect(DB)
    .then(() => {
    console.log("Connection Successful");
    })
    .catch((e) => {
    console.log(e);
    });

// Listening

io.on('connection', (socket) => {
    socket.on('joinSellerRoom', (sellerId) => {
      socket.join(sellerId);
    });

    socket.on('joinPartnerRoom',()=>{
      socket.join('joinPartnerRoom');
    });

    socket.on('joinChatRoom',(orderId,userType)=>{
      socket.join(orderId);
    });
  
    socket.on('disconnect', () => {
      const rooms = Object.keys(socket.rooms);
      rooms.forEach((room) => {
        if (room !== socket.id) {
          socket.leave(room);
          console.log(`Disconnected from room: ${room}`);
        }
      });
    });
  });

server.listen(PORT, "0.0.0.0", () => {
    console.log(`connected at port ${PORT}`);
});



module.exports=app;