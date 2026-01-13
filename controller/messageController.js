const messages=require("../model/messageModel")

exports.addMessageController = async (req, res) => {
  try {
    const { name, email, text,phone } = req.body;

    if (!name || !email || !text ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = new messages({ name, email, text,phone });
    await newMessage.save();

    res.status(201).json({ msg: "Message received", data: newMessage });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get all messages
exports.getAllMessagesController = async (req, res) => {
  try {
    const data = await messages.find().sort({ date: -1 }); // latest first
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

//delete message
exports.deleteMessageController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMsg = await messages.findByIdAndDelete(id);

    if (!deletedMsg) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json({ msg: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


