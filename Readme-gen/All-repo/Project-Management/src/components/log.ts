import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

export const log = async () => {
 const session = await getServerSession(authOptions);
 if (session?.user) {
  return true;
 }
 return false;
};
