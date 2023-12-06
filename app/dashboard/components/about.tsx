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
import { TypographyH1 } from "@/components/typography/h1";

export default function DashboardAboutLocation() {
  const lang = useLangStore((state) => state.lang);
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const user = useUserStore((state) => state.user);

  const renderLocationDescription = () => {
    const element = dynamic(
      () => import(`./locations/${lang}/${user.location}.mdx`),
      {
        ssr: false,
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
            src={`/location/${user.location}.png`}
            width={1100}
            height={150}
            alt={user.location}
            priority
          />
        </CardTitle>
        <CardDescription className="pt-6 text-foreground">
          <TypographyH1>
            {/* @ts-ignore: Implicit any */}
            {dictionary.location[user.location]}
          </TypographyH1>
        </CardDescription>
      </CardHeader>
      <CardContent className="leading-7 [&_p]:mt-6">
        {renderLocationDescription()}
      </CardContent>
    </Card>
  );
}
