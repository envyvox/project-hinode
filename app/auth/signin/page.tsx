"use client";

import { Button } from "@/components/ui/button";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
} from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();
  const params = useSearchParams();
  const error = params.get("error");

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24">
      {/* TODO: add localized errors */}
      {error}
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <Button variant="default" onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </Button>
          </div>
        ))}
    </main>
  );
}
