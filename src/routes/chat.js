const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Chat = require("../models/chat");
const Message = require("../models/message");

const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { targetUserId } = req.params;

    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate("participants", "firstName lastName photos");

    if (!chat) {
      chat = await Chat.create({
        participants: [userId, targetUserId],
      });

      chat = await Chat.findById(chat._id).populate(
        "participants",
        "firstName lastName photos",
      );
    }

    const messages = await Message.find({ chatId: chat._id })
      .sort({ createdAt: 1 })
      .populate("senderId", "firstName lastName");

    res.json({
      chatId: chat._id,
      participants: chat.participants,
      messages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = chatRouter;
