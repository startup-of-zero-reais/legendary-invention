import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

const authOpts: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        })
    ],
    callbacks: {
        signIn(params) {
            const { user, account } = params;
            if (!user) {
                return false;
            }

            console.log('User was logged with %s provider', account?.provider)

            return true;
        },
    }
}

const handler = NextAuth(authOpts)

export {
    handler as GET,
    handler as POST
}