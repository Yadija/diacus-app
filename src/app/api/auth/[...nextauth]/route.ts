import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any) {
        const response = await fetch('http://localhost:5000/auth', {
          method: 'POST',
          cache: 'no-store',
          body: JSON.stringify(credentials),
          headers: {
            'content-type': 'application/json',
          },
        });

        if (!response.ok) {
          return null;
        }

        const responseJson = await response.json();
        return { ...responseJson.data, username: credentials?.username };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token.user = user;
      }

      if (trigger === 'update') {
        token.user = { ...user, ...session.user };
      }

      return token;
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
