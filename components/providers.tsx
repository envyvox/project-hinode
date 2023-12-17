"use client";

import AuthProvider from "@/services/providers/auth-provider";
import DictionaryProvider from "@/services/providers/dictionary-provider";
import ExploreProvider from "@/services/providers/explore-provider";
import FishingProvider from "@/services/providers/fishing-provider";
import UserProvider from "@/services/providers/user-provider";
import WorldStateProvider from "@/services/providers/world-state-provider";
import { TriggerProvider } from "@trigger.dev/react";
import { ThemeProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => (
  <AuthProvider>
    <UserProvider>
      <ThemeProvider attribute="class" enableSystem={false}>
        <TriggerProvider
          publicApiKey={process.env.NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY ?? ""}
        >
          <FishingProvider>
            <ExploreProvider>
              <WorldStateProvider>
                <DictionaryProvider>{children}</DictionaryProvider>
              </WorldStateProvider>
            </ExploreProvider>
          </FishingProvider>
        </TriggerProvider>
      </ThemeProvider>
    </UserProvider>
  </AuthProvider>
);

export default Providers;
