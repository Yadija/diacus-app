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
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
          headers: {
            'content-type': 'application/json',
          },
        });

        if (!response.ok) {
          alert('Failed to fetch data');
        }

        const responseJson = await response.json();
        if (responseJson.data) {
          return { ...responseJson.data, username: credentials.username };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
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
