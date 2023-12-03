"use client";

import AuthProvider from "./auth-provider";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import UserProvider from "./user-provider";
import DictionaryProvider from "./dictionary-provider";
import { Dictionary } from "@/store/dictionary-store";

type Props = {
  children: ReactNode;
  dictionary: Dictionary;
};

export default function Providers({ children, dictionary }: Props) {
  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider attribute="class" enableSystem={false}>
          <DictionaryProvider dictionary={dictionary}>{children}</DictionaryProvider>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
}
