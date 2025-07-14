/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import MedicalLoader from '@/components/Loader';
import axiosInstance from '@/util/axiosInstance';
import { useUserStore } from '@/store/useUserStore';

interface ProtectedUserProps {
  children: ReactNode;
}


const ProtectedUser: React.FC<ProtectedUserProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const setUser = useUserStore((state: any) => state.setUser);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await axiosInstance.get('/user/verifyUser', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setIsAuthenticated(response.status === 200);
        setUser(response.data.data);
      } catch (error) {
        console.error("User authentication check failed:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return <MedicalLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/user/login" />;
  }

  return <>{children}</>;
};

export default ProtectedUser;
