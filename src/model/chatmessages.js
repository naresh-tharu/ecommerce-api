const mongoose = require("mongoose");
const ChatMessagesSchema = new mongoose.Schema({
  msg: {
    type: String,
    required: true
  },
  senderId: {
    type: Number,
    required: true
  },
  receiverId: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
  autoIndex: true
});


const ChatMessageModel = mongoose.model("ChatMessage", ChatMessagesSchema)
module.exports = ChatMessageModel;