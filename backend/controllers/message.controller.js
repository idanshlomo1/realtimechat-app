import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'
import User from '../models/user.model.js'
import { getReceiverSocketId, io } from '../socket/socket.js';
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Check if the receiver exists
        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ error: "Receiver not found" });
        }

        // Check if conversation between sender and receiver exists
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        // If no conversation exists, create one
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        // Create a new message
        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // Save conversation and new message

        await Promise.all([conversation.save(), newMessage.save()]);


        // SOCKET IO FUNCTIONALITY WILL BE HERE
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }


        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        // Log sender and receiver IDs for debugging

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages"); // Populate the messages with the actual documents

        if (!conversation) {
            return res.status(200).json([]); // No conversation found, return empty array
        }

        // Extract messages from the conversation
        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};