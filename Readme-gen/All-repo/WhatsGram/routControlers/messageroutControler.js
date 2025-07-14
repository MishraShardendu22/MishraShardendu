import Conversation from "../Models/conversationModels.js";
import Message from "../Models/messageSchema.js";
import User from "../Models/userModels.js";
import { getReceiverSocketId, io } from "../Socket/socket.js";

export const sendMessage =async(req,res)=>{
try {
    const {messages} = req.body;
    const {id:reciverId} = req.params;
    const senderId = req.user._conditions._id;


    let chats = await Conversation.findOne({
        participants:{$all:[senderId , reciverId]}
    })

    if(!chats){
        chats = await Conversation.create({
            participants:[senderId , reciverId],
        })
    }

    const newMessages = new Message({
        senderId,
        reciverId,
        message:messages,
        conversationId: chats._id
    })

    if(newMessages){
        chats.messages.push(newMessages._id);
    }

    await Promise.all([chats.save(),newMessages.save()]);

     //SOCKET.IO function 
     const reciverSocketId = getReceiverSocketId(reciverId);
     if(reciverSocketId){
        io.to(reciverSocketId).emit("newMessage",newMessages)
     }


    res.status(201).send(newMessages)

} catch (error) {
    res.status(500).send({
        success: false,
        message: error
    })
    console.log(`error in sendMessage ${error}`);
}
}


export const getMessages=async(req,res)=>{
try {
    const {id:reciverId} = req.params;
    const senderId = req.user._conditions._id;

    const chats = await Conversation.findOne({
        participants:{$all:[senderId , reciverId]}
    }).populate("messages")

    if(!chats)  return res.status(200).send([]);
    const message = chats.messages;
    res.status(200).send(message)
} catch (error) {
    res.status(500).send({
        success: false,
        message: error
    })
    console.log(`error in getMessage ${error}`);
}
}
