import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/navbar';
import SearchBar from './components/SearchBar';
import SideBar from './components/Sidebar';
import SendMessage from './components/SendMessage';
import MessageBox from './components/MessageBox';

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-screen bg-gray-900"
    >
      {/* Navbar - Fixed at top */}
      <div className="sticky top-0 z-50 bg-gray-800/80 backdrop-blur-md border-b border-gray-700">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden">
        {/* Left Sidebar */}
        <motion.div 
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-full max-w-sm border-r border-gray-700 bg-gray-800/50 backdrop-blur-md flex flex-col h-full"
        >
          {/* Search Section */}
          <div className="p-4 border-b border-gray-700">
            <SearchBar />
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <SideBar />
          </div>
        </motion.div>

        {/* Main Chat Area */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col bg-gray-900/30 backdrop-blur-md"
        >
          {/* Messages Container */}
          <div className="flex-1 overflow-hidden hover:overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <MessageBox />
          </div>

          {/* Message Input - Fixed at bottom */}
          <div className="border-t border-gray-700 bg-gray-800/50 backdrop-blur-md">
            <div className="max-w-5xl mx-auto px-4 py-3">
              <SendMessage />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;