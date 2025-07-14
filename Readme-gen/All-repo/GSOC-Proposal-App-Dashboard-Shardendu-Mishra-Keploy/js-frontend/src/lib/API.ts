import { User } from './Types';
import { axiosInstance } from '@/util/axiosInstance';

const registerUserMutation = async (user: User) => {
  try {
    console.log('Registering user:', user);
    
    const res = await axiosInstance.post('/user/register',user);

    return res.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

const RegisterUser = async (user: User) => {
  return await registerUserMutation(user);
};

export { RegisterUser };