"use client";

import { useUserStore } from "@/store/user-store";
import { useDictionaryStore } from "@/store/dictionary-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyMuted } from "@/components/typography/muted";

export default function () {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const user = useUserStore((state) => state.user);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-sky-500" />
          Current location: {user.location}
        </div>
        <div className="flex flex-col gap-1">
          <TypographyMuted>
            {dictionary.dashboard["info.profile.about"]}
          </TypographyMuted>
          <div className="rounded-lg border p-2 shadow-sm">
            <TypographyMuted>
              {user.about ??
                dictionary.dashboard["info.profile.about-placeholder"]}
            </TypographyMuted>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
