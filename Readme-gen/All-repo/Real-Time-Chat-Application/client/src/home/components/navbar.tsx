import { useState } from 'react';
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const RollingLoader = () => (
  <div className="flex items-center justify-center h-screen  dark:from-gray-800 dark:to-gray-900">
    <div className="relative">
      <div className="w-24 h-24 border-8 border-blue-200 rounded-full animate-spin-slow"></div>
      <div className="absolute top-0 left-0 w-24 h-24 border-8 border-transparent border-t-pink-500 rounded-full animate-spin-reverse"></div>
      <div className="absolute top-0 left-0 w-24 h-24 border-8 border-transparent border-b-purple-500 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16  dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
        <div className="w-full h-2 bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 animate-loading-bar"></div>
      </div>
    </div>
  </div>
);

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authContext = useAuth();

  if (!authContext) {
    return <RollingLoader />;
  }

  const { authUser } = authContext;

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/logout");
      if (res.status === 200) {
        console.log(res.data.message);
      }
      setLoading(false);
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("Logout Error: ", err);
      setLoading(false);
    }
  };

  // Added function to handle profile click
  const handleProfileClick = () => {
    navigate("/profile");
  };

  if (loading) {
    return <RollingLoader />;
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                {/* Make sure the onClick is correctly set here */}
                <TooltipTrigger>
                  <Avatar className="h-10 w-10 cursor-pointer" onClick={handleProfileClick}> {/* Added onClick here */}
                    <AvatarImage src={authUser.profilepic} alt={authUser.username} />
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click To View Your Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{authUser.email}</span>
          </div>
          <motion.h1
            className="text-2xl font-bold text-gray-900 dark:text-white"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            Let's Chat it Out
          </motion.h1>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white border-none shadow-md hover:shadow-lg transition-all duration-300"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;