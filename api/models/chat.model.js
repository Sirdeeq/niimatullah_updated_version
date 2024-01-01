import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent"
  },
  messages: [
    {
      sender: String, // 'user' or 'agent'
      content: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
