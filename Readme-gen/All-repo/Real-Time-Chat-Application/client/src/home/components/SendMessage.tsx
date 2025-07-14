import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import userConversation from "../../zustand/useConversation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SendMessage = () => {
    const { selectedConversation } = userConversation();
    const [msg, setMsg] = useState("");
    const [isSending, setIsSending] = useState(false);

    const sendMessage = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!msg.trim() || !selectedConversation) return;

        try {
            setIsSending(true);
            const res = await axios.post(`/api/message/send/${selectedConversation._id}`, { message: msg });
            console.log(res);
            setMsg("");
        } catch (err) {
            console.error("Failed to send message", err);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-t border-gray-700/50 p-4"
            >
                <form 
                    onSubmit={sendMessage}
                    className="max-w-4xl mx-auto flex items-center gap-2"
                >
                    <div className="relative flex-1">
                        <Input
                            type="text"
                            placeholder="Type a message..."
                            value={msg}
                            onChange={(event) => setMsg(event.target.value)}
                            className="pr-10 w-full bg-gray-800/50 border-gray-700 text-gray-100 
                                     placeholder-gray-400 focus:ring-2 focus:ring-blue-500 
                                     focus:border-transparent h-11 rounded-lg"
                            disabled={isSending}
                        />
                    </div>
                    <Button 
                        type="submit"
                        disabled={!msg.trim() || isSending || !selectedConversation}
                        className={`min-w-[80px] h-11 rounded-lg transition-colors duration-200
                                  ${!msg.trim() || !selectedConversation 
                                    ? 'bg-gray-700 hover:bg-gray-600' 
                                    : 'bg-blue-600 hover:bg-blue-500'}`}
                    >
                        {isSending ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <Loader2 className="h-4 w-4 text-gray-100" />
                            </motion.div>
                        ) : (
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="flex items-center gap-2 text-gray-100"
                            >
                                <Send className="h-4 w-4" />
                                <span className="hidden sm:inline">Send</span>
                            </motion.div>
                        )}
                    </Button>
                </form>
            </motion.div>
        </AnimatePresence>
    );
};

export default SendMessage;