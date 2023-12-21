"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
    const loadData = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    loadData();
  }, []);

  return (
    <main className="flex flex-col items-center p-24">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>Using one of the following services</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-5">
          {/* TODO: add localized errors */}
          {error && <div className="col-span-2">{error}</div>}
          {providers ? (
            Object.values(providers).map((provider) => (
              <Button
                key={provider.name}
                variant="outline"
                onClick={() => signIn(provider.id)}
              >
                {provider.name}
              </Button>
            ))
          ) : (
            <>
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
