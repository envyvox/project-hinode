import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";

const newUserCurrencyAmount = 1000;
const newUserBannerId = "clqd2zrhy000sxsul7i0v6ytv";

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  events: {
    async signIn({ user, isNewUser }) {
      if (isNewUser) {
        await prisma.userCurrency.create({
          data: {
            userId: user.id,
            currency: "Ien",
            amount: newUserCurrencyAmount,
          },
        });
        await prisma.userTitle.create({
          data: {
            userId: user.id,
            title: "Newbie",
          },
        });
        await prisma.userBanner.create({
          data: {
            userId: user.id,
            bannerId: newUserBannerId,
            isActive: true,
          },
        });
      }
    },
  },
};
