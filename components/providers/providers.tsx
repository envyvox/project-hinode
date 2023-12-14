"use client";

import AuthProvider from "./auth-provider";
import { ThemeProvider } from "next-themes";

import UserProvider from "./user-provider";
import DictionaryProvider from "./dictionary-provider";
import { TriggerProvider } from "@trigger.dev/react";
import FishingProvider from "./fishing-provider";
import ExploreProvider from "./explore-provider";

type Props = {
  children: React.ReactNode;
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
              <ExploreProvider>
                <DictionaryProvider>{children}</DictionaryProvider>
              </ExploreProvider>
            </FishingProvider>
          </TriggerProvider>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
}
