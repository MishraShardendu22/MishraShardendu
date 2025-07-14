import Conversation from "../model/conversation.model.js"; 
import Message from "../model/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        console.log("Check - 1 message")
        const { message } = req.body; console.log(message)
        const {id:reciverId} = req.params; console.log(reciverId)
        const senderId = req.user._id; console.log(senderId)

        console.log("Check - 2 message")
        
        let chat = await Conversation.findOne({
            participants:{$all:[senderId , reciverId]}
        })

        console.log("Check - 3 message")
        console.log(chat)

        if (!chat) {
            chat = new Conversation({
                participants: [senderId, reciverId],
            });
        }

        console.log("Check - 4 message")

        const newMessage = new Message({
            senderId,
            reciverId,
            message,
            conversationId: chat._id,
        });

        console.log("Check - 5 message")
        // Error: chat.message might be undefined, so initialize it if necessary
        if (newMessage) {
            if (!chat.message) {  // Check if chat.message is undefined
                chat.message = [];  // Initialize it to an empty array
            } 
            chat.message.push(newMessage._id);  // Push the message ID
        }

        console.log("Check - 6 message")
        await Promise.all([chat.save(), newMessage.save()]);

        console.log("Check - 7 message")
        res.status(200).send({
            success: true,
            message: "Message Sent",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in sending the message",
        });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: reciverId } = req.params;
        const senderId = req.user._id;

        const chat = await Conversation.findOne({
            participants: {
                $all: [senderId, reciverId],
            },
        }).populate("message");

        if (!chat) {
            // Error: Add return here to avoid sending two responses.
            return res.status(200).send({  // Return immediately to prevent multiple responses
                success: true,
                message: "No Message Found",
            });
        }

        const messages = chat.message;
        res.status(200).send({
            success: true,
            messages,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in getting the message",
        });
    }
};