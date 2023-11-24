"use client";

import { Button } from "@/components/ui/button";
import { getProviders, signIn } from "next-auth/react";

export default async function SignInPage() {
  const providers = await getProviders();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name} style={{ marginBottom: 0 }}>
            <Button
              variant="default"
              onClick={() =>
                signIn(provider.id, { callbackUrl: "http://localhost:3000" })
              }
            >
              Sign in with {provider.name}
            </Button>
          </div>
        ))}
    </main>
  );
}
