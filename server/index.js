const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3696;
const cors = require("cors");
const app = express();
app.use(cors());
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//const DB = "mongodb+srv://dgdevanshi:medibuddy@medibuddycluster.bk3xmrr.mongodb.net/?retryWrites=true&w=majority"
const DB = "mongodb+srv://tm217:Tushar16@cluster0.aqzeo9l.mongodb.net/?retryWrites=true&w=majority"


const authRouter = require("./auth");
const orderRouter = require("./order");
const partnerRouter = require("./partner");

// middleware

app.use(express.json());

app.set('io', io);
app.use("/auth", authRouter);
app.use("/order", orderRouter);
app.use("/partner", partnerRouter);


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
      socket.join('joinPartnerRoom');//broadcast room for all partners
    })
  
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