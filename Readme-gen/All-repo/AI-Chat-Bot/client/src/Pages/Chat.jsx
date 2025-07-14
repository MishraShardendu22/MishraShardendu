/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, MessageCircle, Send } from "lucide-react";
import CardFirstTime from "../Components/CardFirstTime";
import priorMessages from "../constants/PriorMsg";
import MessageInput from "../Components/SearchBar";
import { clearHistory, setMessage } from "../constants/MessageAndHistoryContext";
import axios from "axios";
import { toast } from "react-toastify";

const Chat = () => {
  const history = useSelector((state) => state.chat.history);
  const dispatch = useDispatch();

  const clearChat = () => {
    const clearDB = async () => {      
      await axios.delete('https://ai-back-rujt.onrender.com/clear'); // Await this response
      dispatch(clearHistory()); // Dispatch only after the DB clear succeeds
      toast.success('History cleared successfully');
    };
    clearDB(); // Call the async function
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-violet-800 to-blue-800 hover:scale-105 transition ease-linear duration-200 pb-4 relative"
      >
        <a href="https://github.com/MishraShardendu22" target="_blank" rel="noopener noreferrer" className="hover:underline">Shardendu Mishra&apos;s</a> Chat Bot
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"></span>
      </motion.h1>

      {history.length !== 0 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearChat}
          className="mb-8 flex items-center justify-center px-6 py-3 font-bold text-white rounded-full shadow-2xl bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 ease-out"
        >
          <Trash2 className="mr-2" size={20} />
          Clear Chat History
        </motion.button>
      )}

      <AnimatePresence>
        {history.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {priorMessages.map((message, index) => (
              <CardFirstTime
                key={index}
                title={message.title}
                description={message.description}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex-grow overflow-y-auto mb-8 bg-gray-900 rounded-lg shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-4 p-4 bg-gray-800 rounded-t-lg flex items-center">
              <MessageCircle className="mr-2" size={24} />
              Chat History
            </h2>
            <ul className="space-y-4 p-4">
              {history.map((msg, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`p-4 rounded-lg shadow-md ${
                    index % 2 === 0 
                      ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white mr-12" 
                      : "bg-gradient-to-r from-blue-600 to-blue-700 text-white ml-12"
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full ${index % 2 === 0 ? 'bg-purple-500' : 'bg-blue-500'} flex items-center justify-center`}>
                      {index % 2 === 0 ? 'U' : 'B'}
                    </div>
                    <div className="ml-3 text-xl ">
                      {msg}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <MessageInput />
    </div>
  );
};

export default Chat;