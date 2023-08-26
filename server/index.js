const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3696;
const app = express();
const cors = require("cors");
app.use(cors());
//const DB = "mongodb+srv://dgdevanshi:medibuddy@medibuddycluster.bk3xmrr.mongodb.net/?retryWrites=true&w=majority"
const DB = "mongodb+srv://tm217:Tushar16@cluster0.aqzeo9l.mongodb.net/?retryWrites=true&w=majority"
const authRouter = require("./auth");


// middleware
app.use(express.json());
app.use("/auth", authRouter);


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

app.listen(PORT, "0.0.0.0", () => {
    console.log(`connected at port ${PORT}`);
});

module.exports=app;