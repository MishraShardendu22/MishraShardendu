import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions, User } from 'next-auth';
import { usersTable } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { db } from '@/db';

export const authOptions: NextAuthOptions = {
 providers: [
  CredentialsProvider({
   name: 'Credentials',
   id: 'credentials',
   credentials: {
    identifier: {
     label: 'Username or Email',
     type: 'text',
     placeholder: 'ShardenduMishra22',
    }, // Changed 'email' to 'identifier'
    password: { label: 'Password', type: 'password' },
   },
   async authorize(credentials) {
    try {
     // Check if credentials.identifier is email or username
     const user = await db
      .select()
      .from(usersTable)
      .where(
       or(
        eq(usersTable.email, credentials?.identifier || ''),
        eq(usersTable.username, credentials?.identifier || '')
       )
      )
      .limit(1);

     if (user.length === 0) {
      throw new Error('User not found');
     }

     const foundUser = user[0];

     if (!foundUser.isVerified) {
      throw new Error('User not verified');
     }

     const isValid = await bcrypt.compare(
      credentials?.password || '',
      foundUser.passwordHash
     );
     if (!isValid) {
      throw new Error('Invalid password');
     }

     return foundUser as unknown as User;
    } catch (e) {
     console.error(e);
     throw new Error('Something went wrong');
    }
   },
  }),
 ],
 callbacks: {
  async jwt({ token, user }) {
   if (user) {
    token.id = user.id;
    token.isVerified = user.isVerified;
    token.isAcceptingMessages = user.isAcceptingMessages;
    token.username = user.username;
   }
   return token;
  },
  async session({ session, token }) {
   if (token) {
    session.user.id = token.id;
    session.user.isVerified = token.isVerified;
    session.user.isAcceptingMessages = token.isAcceptingMessages;
    session.user.username = token.username;
   }
   return session;
  },
 },
 pages: {
  signIn: '/sign-in',
 },
 session: {
  strategy: 'jwt',
 },
 secret: process.env.SECRET,
};
