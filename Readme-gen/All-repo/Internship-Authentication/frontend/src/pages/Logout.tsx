/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { sendRequest } from '../util/utils';
import Cookies from 'js-cookie';
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {    
    try {
      const response = await sendRequest('post', '/logout', {});
      Cookies.remove('jwt');
      localStorage.removeItem('user');
      alert(response?.message || 'Logout successful');
      navigate('/login'); // Correct usage of navigate
    } catch (error) {
      alert('An error occurred while logging out');
      navigate('/home'); 
    }
  };


  return (
    <Button 
      variant="outline" 
      onClick={handleLogout}
      className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </Button>
  );
};

export default Logout;