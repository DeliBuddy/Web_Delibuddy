const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    roomId:{type:String},
    messages:
        [{
        id:{type:Number},
        user:{type:String},
        text: {type:String},
    }],
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = {Chat,chatSchema};

