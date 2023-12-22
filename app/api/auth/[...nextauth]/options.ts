import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import { addCurrencyToUser } from "@/services/data-access/currency";
import { addTitleToUser } from "@/services/data-access/title";
import { addBannerToUser } from "@/services/data-access/banner";
import { updateUserDisplayName } from "@/services/data-access/user";
import { Currency, Title } from "@prisma/client";

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
    newUser: "/welcome",
  },
  events: {
    async signIn({ user, isNewUser }) {
      if (isNewUser) {
        await updateUserDisplayName(user.id, user.name ?? "Anonymous");
        await addCurrencyToUser(user.id, Currency.Ien, newUserCurrencyAmount);
        await addTitleToUser(user.id, Title.Newbie);
        await addBannerToUser(user.id, newUserBannerId);
      }
    },
  },
};
