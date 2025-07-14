/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

// Define a Message type for better type safety
interface Message {
    senderId: string;
    receiverId: string;
    message: string;
}

interface UserConversationState {
    selectedConversation: {
      fullname : string ;_id: string; username: string; profilepic: string; gender: string; email : string; 
} | null;
    setSelectedConversation: (selectedConversation: { fullname: string; _id: string; username: string;email : string; profilepic: string; gender: string } | null) => void;
    messages: Message[];
    setMessages: (messages: Message[]) => void;
}

const userConversation = create<UserConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
}));

export default userConversation;