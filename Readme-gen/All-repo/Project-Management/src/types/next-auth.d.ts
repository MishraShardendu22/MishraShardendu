import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
 interface Session {
  user: {
   id?: string;
   isVerified?: boolean;
   isAcceptingMessages?: boolean;
   username?: string;
  } & DefaultSession['user'];
 }

 interface User {
  id?: string;
  isVerified?: boolean;
  isAcceptingMessages?: boolean;
  username?: string;
 }
}

declare module 'next-auth/jwt' {
 interface JWT {
  id?: string;
  isVerified?: boolean;
  isAcceptingMessages?: boolean;
  username?: string;
 }
}
