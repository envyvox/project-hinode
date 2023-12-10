"use client";

import { Button } from "@/components/ui/button";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
} from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();

  useEffect(() => {
    getProviders().then((providers) => setProviders(providers));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name} style={{ marginBottom: 0 }}>
            <Button variant="default" onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </Button>
          </div>
        ))}
    </main>
  );
}
