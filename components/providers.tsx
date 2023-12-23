"use client";

import AuthProvider from "@/services/providers/auth-provider";
import DictionaryProvider from "@/services/providers/dictionary-provider";
import ReactQueryProvider from "@/services/providers/react-query-provider";
import UserProvider from "@/services/providers/user-provider";
import { TriggerProvider } from "@trigger.dev/react";
import { ThemeProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => (
  <ReactQueryProvider>
    <AuthProvider>
      <UserProvider>
        <ThemeProvider attribute="class" enableSystem={false}>
          <TriggerProvider
            publicApiKey={
              process.env.NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY as string
            }
          >
            <DictionaryProvider>{children}</DictionaryProvider>
          </TriggerProvider>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  </ReactQueryProvider>
);

export default Providers;
