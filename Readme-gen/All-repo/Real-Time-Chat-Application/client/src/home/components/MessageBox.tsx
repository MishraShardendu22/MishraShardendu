import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Loader2, ArrowLeft} from "lucide-react";
import userConversation from "@/zustand/useConversation";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Profile Tooltip Component
interface ProfileTooltipProps {
  show: boolean;
  username: string;
  profilepic: string;
}

const ProfileTooltip = ({ show, username, profilepic }: ProfileTooltipProps) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute left-0 top-full mt-2 z-50"
      >
        <div className="relative">
          {/* Tooltip Arrow */}
          <div className="absolute -top-2 left-4 w-4 h-4 bg-slate-800 transform rotate-45" />
          
          {/* Tooltip Content */}
          <div className="relative bg-slate-800 rounded-xl shadow-xl p-4 w-[280px] backdrop-blur-lg border border-slate-700">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <img
                  src={profilepic}
                  alt={username}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/50"
                />
              </div>
              <div className="flex flex-col min-w-0 flex-1"> {/* Added min-w-0 and flex-1 */}
                <span className="text-white font-medium truncate">{username}</span>
                <span className="text-slate-400 text-sm">View Profile</span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-slate-700">
              <div

                className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700"
              >
                <span className="text-sm truncate">Click image to View Profile</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const MessageBox = () => {
  const { selectedConversation } = userConversation();
  const [msgs, setMsgs] = useState<{ _id: string; message: string; senderId: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);
  const navigate = useNavigate();

  const getChats = async () => {
    const selectedId = selectedConversation?._id;
    if (selectedId) {
      try {
        const res = await axios.get(`/api/message/${selectedId}`);
        if (res.data?.messages) {
          setMsgs(res.data.messages);
        } else {
          setMsgs([]);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
        setMsgs([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (selectedConversation) {
      setIsLoading(true);
      getChats();

      const interval = setInterval(getChats, 10000);
      return () => clearInterval(interval);
    } else {
      setMsgs([]);
      setIsLoading(false);
    }
  }, [selectedConversation]);

  if (!selectedConversation) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="w-full max-w-md p-6">
          <CardContent className="flex flex-col items-center space-y-4 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400" />
            <p className="text-lg font-medium text-gray-600">No conversation selected</p>
            <p className="text-sm text-gray-500">Choose a conversation to start messaging</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-slate-900 to-slate-800"> {/* Changed to h-screen */}
      {/* Enhanced Header */}
      <div className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur-lg border-b border-slate-700">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="lg:hidden text-slate-300 hover:text-white hover:bg-slate-800"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="relative"
                onMouseEnter={() => setShowProfileTooltip(true)}
                onMouseLeave={() => setShowProfileTooltip(false)}
              >
                <img
                  src={selectedConversation.profilepic}
                  alt={selectedConversation.username}
                  className="w-10 h-10 rounded-full object-cover cursor-pointer ring-2 ring-offset-2 ring-blue-500 transition-transform duration-300 hover:scale-105"
                  onClick={() => navigate("/selectedProfile")}
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></span>
                
                <ProfileTooltip 
                  show={showProfileTooltip}
                  username={selectedConversation.username}
                  profilepic={selectedConversation.profilepic}
                />
              </div>
              <div className="flex flex-col min-w-0 flex-1"> {/* Added min-w-0 and flex-1 */}
                <h2 className="text-base font-semibold text-white truncate">
                  {selectedConversation.username}
                </h2> 
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* Messages Section */}
      <ScrollArea className="flex-grow p-4">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
          </div>
        ) : msgs.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <Card className="w-full max-w-md p-6 bg-slate-800/50 border-slate-700">
              <CardContent className="flex flex-col items-center space-y-4 text-center">
                <MessageSquare className="h-12 w-12 text-slate-400" />
                <p className="text-lg font-medium text-slate-300">No messages yet</p>
                <p className="text-sm text-slate-400">Start the conversation by sending a message</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {msgs.map((msg) => (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`flex ${
                    msg.senderId === selectedConversation._id ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 shadow-lg ${
                      msg.senderId === selectedConversation._id
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-700 text-slate-100'
                    }`}
                  >
                    <p className="break-words text-sm">{msg.message}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default MessageBox;
