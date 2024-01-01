import Chat from "../models/chat.model.js";
export const createChat = async (req, res) => {
  try {
    const { userId, agentId } = req.body;
    const newChat = await Chat.create({ userId, agentId });
    res.status(201).json(newChat);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { chatId, sender, content } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { messages: { sender, content } }
      },
      { new: true }
    );
    res.status(200).json(updatedChat);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
