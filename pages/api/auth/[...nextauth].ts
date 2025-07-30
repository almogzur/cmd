import NextAuth, { AuthOptions, DefaultSession, DefaultUser } from "next-auth";
import EmailProvider, { SendVerificationRequestParams } from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/prisma";
import { Adapter } from "next-auth/adapters";
import { createTransport } from "nodemailer";

// === Type Augmentation ===
type Role = "USER" | "ADMIN";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: Role;
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}




// === NextAuth Config ===
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,

  session: {
    strategy: "jwt", // 'database' sessions do not persist role securely in redirect()
  },

  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: 'Check My Desk <no-reply@CheckMyDesk.com>',
      maxAge: 60 * 60 * 24, // 24 hours
    }),

  ],

  callbacks: {
    // Sign in: Fetch user role securely from DB
    async signIn({ user }) {
      const email = user.email ?? undefined;
      if (!email) return false;

      const foundUser = await prisma.user.findUnique({
        where: { email },
      });

      if (!foundUser) return false;

      user.id = foundUser.id;
      user.role = foundUser.role;
      return true;
    },

    // Store role & id in JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    // Expose role & id in session
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },

    // Secure redirect based on JWT-stored role
 async redirect({  baseUrl }) {
    return baseUrl
  }
  },

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)

  },

  useSecureCookies: process.env.NODE_ENV === "production",
};

export default NextAuth(authOptions);
