// try{
//     const response = await fetch(`http://localhost:3696/chat/addMessage`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//        messageType:isUser?'userMessage':'partnerMessage',
//         message:newMessage,
//       }),
//     });
//     setMessages([...messages,newMessage,]);
//     setMessage('');
//   }
//   catch(e){
//     console.log(e);
//   }

//write api for the above fromntend code

const express = require("express");
const chatRouter = express.Router();

chatRouter.post("/addMessage", async (req, res) => {
    try {
        const {messageType,message,roomId} = req.body;
        const io=req.app.get('io');
        io.to(roomId).emit(messageType,message);
        return res.status(200).json({message:"Message sent successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch sellers" });
    }
});

module.exports= chatRouter;