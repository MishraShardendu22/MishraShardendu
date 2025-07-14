import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role: string;
      id: string;
      reportedVideos: string[];
    } & DefaultSession['user'];
  }
}
