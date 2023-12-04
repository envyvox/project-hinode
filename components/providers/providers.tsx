"use client";

import AuthProvider from "./auth-provider";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import UserProvider from "./user-provider";
import DictionaryProvider from "./dictionary-provider";
import LangProvider from "./lang-provider";

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider attribute="class" enableSystem={false}>
          <LangProvider>
            <DictionaryProvider>{children}</DictionaryProvider>
          </LangProvider>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
}
