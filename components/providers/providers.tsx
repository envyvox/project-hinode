"use client";

import AuthProvider from "./auth-provider";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import UserProvider from "./user-provider";
import DictionaryProvider from "./dictionary-provider";
import { TriggerProvider } from "@trigger.dev/react";
import FishingProvider from "./fishing-provider";

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider attribute="class" enableSystem={false}>
          <TriggerProvider
            publicApiKey={process.env.NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY ?? ""}
          >
            <FishingProvider>
              <DictionaryProvider>{children}</DictionaryProvider>
            </FishingProvider>
          </TriggerProvider>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
}
