const express = require("express");
const chatRouter = express.Router();
const {Chat} = require('./models/chat');

chatRouter.post("/addMessage", async (req, res) => {
    try {
        const {messageType,message,roomId} = req.body;
        const io=req.app.get('io');

        io.to(roomId).emit(messageType,message);

        const chatRoom= await Chat.findOne({roomId});
        chatRoom.messages.push(message);
        await chatRoom.save();

        return res.status(200).json({message:"Message sent successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch sellers" });
    }
});

chatRouter.get("/getMessages", async (req, res) => {
    try {
        const {roomId} = req.body;
        const chatRoom= await Chat.findOne({roomId});
        return res.status(200).json(chatRoom.messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch sellers" });
    }
});


module.exports= chatRouter;