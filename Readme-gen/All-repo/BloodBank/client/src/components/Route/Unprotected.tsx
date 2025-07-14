/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from '@/util/axiosInstance';
import MedicalLoader from '../Loader';

const UnProtected = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(true);
        return;
      }

      try {
        const response = await axiosInstance.post('/auth/verify', {
          token: token,
        });
        if (response.status === 200) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
        setIsAuthenticated(true);
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return <MedicalLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return <>{children}</>;
};

export default UnProtected;
