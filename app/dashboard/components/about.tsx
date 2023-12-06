import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserStore } from "@/store/user-store";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLangStore } from "@/store/lang-store";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardAboutLocation() {
  const lang = useLangStore((state) => state.lang);
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const userLocation = useUserStore((state) => state.user.location);

  const renderLocationDescription = () => {
    const element = dynamic(
      () => import(`./locations/${lang}/${userLocation}.mdx`),
      {
        ssr: false,
        loading: () => (
          <div className="mt-6 flex flex-col gap-6">
            <Skeleton className="h-12" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        ),
      },
    );
    return React.createElement(element);
  };

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>
          <Image
            className="rounded-xl"
            src={`/location/${userLocation}.png`}
            width={1100}
            height={150}
            alt={userLocation}
            priority
          />
        </CardTitle>
        <CardDescription className="scroll-m-20 pt-6 text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
          {/* @ts-ignore: Implicit any */}
          {dictionary.location[userLocation]}
        </CardDescription>
      </CardHeader>
      <CardContent className="leading-7 [&_p]:mt-6">
        {renderLocationDescription()}
      </CardContent>
    </Card>
  );
}
