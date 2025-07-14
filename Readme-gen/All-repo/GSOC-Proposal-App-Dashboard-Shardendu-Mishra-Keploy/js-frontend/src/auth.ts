import NextAuth, { DefaultSession } from 'next-auth';
import { User } from './lib/Types';
import { RegisterUser } from './lib/API';
import GitHub from 'next-auth/providers/github';

declare module 'next-auth' {
  interface Session {
    user: {
      bio?: string;
      login?: string;
      location?: string;
      followers?: number;
      following?: number;
      created_at?: string;
      updated_at?: string;
    } & DefaultSession['user'];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ profile }) {
      try {
        const NewUser: User = {
          bio: profile?.bio as string,
          name: profile?.name as string,
          blog: profile?.blog as string,
          email: profile?.email as string,
          login: profile?.login as string,
          company: profile?.company as string,
          location: profile?.location as string,
          repos_url: profile?.repos_url as string,
          followers: profile?.followers as number,
          following: profile?.following as number,
          avatar_url: profile?.avatar_url as string,
          created_at: profile?.created_at as string,
          updated_at: profile?.updated_at as string,
          public_repos: profile?.public_repos as number,
          twitter_username: profile?.twitter_username as string,
          subscriptions_url: profile?.subscriptions_url as string,
          organizations_url: profile?.organizations_url as string,
        };
        await RegisterUser(NewUser);
        return true;
      } catch (error) {
        console.error('Error registering user:', error);
        return false;
      }
    },

    async jwt({ token, profile }) {
      if (profile) {
        token.bio = profile.bio as string;
        token.login = profile.login as string;
        token.location = profile.location as string;
        token.followers = profile.followers as number;
        token.following = profile.following as number;
        token.created_at = profile.created_at as string;
        token.updated_at = profile.updated_at as string;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.login) {
        session.user.bio = token.bio as string;
        session.user.login = token.login as string;
        session.user.location = token.location as string;
        session.user.followers = token.followers as number;
        session.user.following = token.following as number;
        session.user.created_at = token.created_at as string;
        session.user.updated_at = token.updated_at as string;
      }
      return session;
    },
  },
});
