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
import TypographyMuted from "@/components/typography/muted";
import useUserActiveBanner from "@/hooks/use-user-active-banner";
import BannerImage from "@/components/banner-image";

const UserProfile = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const user = useUserStore((state) => state.user);
  const userActiveBanner = useUserActiveBanner();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.displayName}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-sky-500" />
          Current location: {user.location}
        </div>
        <div className="flex flex-col gap-1">
          <TypographyMuted>
            {dictionary.dashboard["user.profile.about"]}
          </TypographyMuted>
          <div className="rounded-lg border p-2 shadow-sm">
            <TypographyMuted>
              {user.about ??
                dictionary.dashboard["user.profile.about-placeholder"]}
            </TypographyMuted>
          </div>
        </div>
        <BannerImage banner={userActiveBanner?.banner} />
      </CardContent>
    </Card>
  );
};

export default UserProfile;
