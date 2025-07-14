/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import MedicalLoader from '@/components/Loader';
import axiosInstance from '@/util/axiosInstance';
import { useUserStore } from '@/store/store';

interface ProtectedDonorProps {
  children: ReactNode;
}

const ProtectedDonor: React.FC<ProtectedDonorProps> = ({ children }) => {
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
        const response = await axiosInstance.get('/donor/verifyDonor', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(response.data.data);
        setIsAuthenticated(response.status === 200);
      } catch (error) {
        console.error("Donor authentication check failed:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return <MedicalLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/donor/login" />;
  }

  return <>{children}</>;
};

export default ProtectedDonor;
