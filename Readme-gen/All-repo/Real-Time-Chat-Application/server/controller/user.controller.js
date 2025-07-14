import Conversation from "../model/conversation.model.js"; // Importing Conversation model
import User from "../model/user.model.js"; // Importing User model

// Function to get users based on search query
export const getUserBySearch = async (req, res) => {
    try {
        const search = req.query.search;
        const currectUserId = req.user._id;

        const user = await User.find(
            {
                $and: [
                    {
                        $or: [
                            { username: { $regex: '.*' + search + '.*', $options: 'i' } },
                            { fullname: { $regex: '.*' + search + '.*', $options: 'i' } }
                        ]
                    },
                    {
                        _id: { $ne: currectUserId }
                    }
                ]
            }
        ).select("-password").select("email");

        res.status(200).send(user);

    } catch (error) {
        console.log("Error in Getting User By Search", error.message);
        res.status(500).send({
            success: false,
            message: "Error in Getting User By Search"
        });
    }
}


export const getCurrentChats = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const currentChat = await Conversation.find(
            {
                participants: currentUserId
            }
        ).sort(
            {
                updatedAt: -1
            }
        );


        if (!currentChat || currentChat.length === 0) {
            res.status(200).send([]);
            return;
        }

        // Collecting IDs of other participants in the current user's conversations
        const participantsIDS = currentChat.reduce((ids, conversation) => {
            // Filtering out the current user ID from the conversation participants
            const otherParticipants = conversation.participants.filter(id => id !== currentUserId);
            return [...ids, ...otherParticipants]; // Accumulating other participant IDs
        }, []);

        // Filtering to ensure only unique other participants are included
        const otherParticipantsIDS = participantsIDS.filter(id => id.toString() !== currentUserId.toString());

        // Finding user details for the other participants in the conversations
        const user = await User.find({ _id: { $in: otherParticipantsIDS } }).select("-password").select("-email");

        // Mapping over other participants to get their details
        const users = otherParticipantsIDS.map(id => user.find(user => user._id.toString() === id.toString()));

        res.status(200).send(users); // Sending the details of other participants in response

    } catch (error) {
        console.log("Error in Getting Current Chats: ", error.message);
        res.status(500).send({
            success: false,
            message: "Error in Getting Current Chats"
        });
    }
}
