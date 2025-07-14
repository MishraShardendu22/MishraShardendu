import { useState, useEffect, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import MedicalLoader from '@/components/Loader';
import axiosInstance from '@/util/axiosInstance';
import React from 'react'; // Added import for React

interface UnprotectedProps {
  children: ReactNode;
}

const Unprotected: React.FC<UnprotectedProps> = ({ children }) => {
  const [authState, setAuthState] = useState<{ isAuthenticated: boolean, userType: string | null }>({ isAuthenticated: false, userType: null });

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.log("No token found, assuming unauthenticated user.");
        setAuthState({ isAuthenticated: false, userType: null });
        return;
      }

      try {
        console.log("Checking authentication...");

        const responses = await Promise.allSettled([
          axiosInstance.get('/organisation/verifyOrganisation', { headers: { Authorization: `Bearer ${token}` } }),
          axiosInstance.get('/admin/verifyAdmin', { headers: { Authorization: `Bearer ${token}` } }),
          axiosInstance.get('/donor/verifyDonor', { headers: { Authorization: `Bearer ${token}` } }),
          axiosInstance.get('/patient/verifyPatient', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const successfulResponse = responses.find(
          (res): res is PromiseFulfilledResult<any> => res.status === "fulfilled" && res.value.status === 200
        );

        if (successfulResponse) {
          const userType = successfulResponse.value.config.url?.split('/')[1];
          setAuthState({ isAuthenticated: true, userType });
        } else {
          setAuthState({ isAuthenticated: false, userType: null });
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setAuthState({ isAuthenticated: false, userType: null });
      }
    };

    checkAuthentication();
  }, []);

  console.log("Auth State:", authState);

  if (!authState.isAuthenticated && authState.userType === null) {
    <Navigate to="/" />
  }

  if (authState.isAuthenticated) {
    switch (authState.userType) {
      case 'organisation':
        return <Navigate to="/organisation/dashboard" />;
      case 'donor':
        return <Navigate to="/donor/dashboard" />;
      case 'patient':
        return <Navigate to="/patient/dashboard" />;
      case 'admin':
        return <Navigate to="/admin/dashboard" />;
      default:
        console.error("Unknown user type:", authState.userType);
        return <Navigate to="/" />;
    }
  }

  return <>{children}</>;
};

export default Unprotected;