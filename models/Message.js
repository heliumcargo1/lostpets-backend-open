const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    sender_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reciever_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

const Message = mongoose.model("Message",messageSchema)

module.exports = Message