import NextAuth, { AuthOptions, DefaultSession, DefaultUser } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import {z} from "zod"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma/prisma"
import { Adapter } from "next-auth/adapters"

type Role = "USER" | "ADMIN"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: Role
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role: Role
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: Role
  }
}

export const authOptions: AuthOptions = {
adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "database"
  },

  providers: [

    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        },
      },
      from: 'Check My Desk <no-reply@ecommerce.com>',
      maxAge: 60 * 60 * 24,

    }),
  ],
callbacks: {
  async signIn({ user }) {
    const email = user.email ?? undefined;
    if (!email) return false;

    const foundUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!foundUser) return false;

    user.role = foundUser.role; // store it for session/redirect
    return true;
  },

  async session({ session, user }) {
    session.user = {
      ...session.user,
      id: user.id,
      role: user.role,
    };
    return session;
  },


},
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: "/auth/error",
    verifyRequest: '/auth/verify-request',

  },
  useSecureCookies: process.env.NODE_ENV === 'production' ? true : false,
}

export default NextAuth(authOptions)
