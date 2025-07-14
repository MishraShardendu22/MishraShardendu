/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@/util/axiosInstance';
import MedicalLoader from '@/components/Loader';
import { useUserStore } from '@/store/store';
import Navbar from '@/components/Navbar';
import Nav2 from '@/components/Nav2';
import { useEffect } from 'react';

const Home = () => {
  const token = localStorage.getItem('token');
  const setUser = useUserStore((state: any) => state.setUser);
  const user = useUserStore((state: any) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      try {
        const response = await axiosInstance.get('/auth/currentUser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response?.data?.data;

        if (userData) {
          setUser(userData);
        } else {
          console.error('No user data in API response');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [token, setUser, user]);

  if (!user) {
    return <MedicalLoader />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Nav2 />
      <p>Some Description About Our BLood Bank</p>
    </div>
  );
};

export default Home;
