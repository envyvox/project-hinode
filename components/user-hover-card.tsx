import { GameUser } from "@/services/data-access/user";
import React, { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import BannerImage from "./banner-image";
import { useDictionaryStore } from "@/store/dictionary-store";
import TypographyMuted from "./typography/muted";
import { Banner } from "@prisma/client";
import { getUserActiveBanner } from "@/services/data-access/banner";
import TypographyLarge from "./typography/large";
import { Button } from "./ui/button";

type Props = {
  user: GameUser;
};

const UserHoverCard = ({ user }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const [activeBanner, setActiveBanner] = useState<Banner>();

  useEffect(() => {
    const loadData = async () => {
      if (user.id !== "") {
        const userBanner = await getUserActiveBanner(user.id);
        setActiveBanner(userBanner.banner);
      }
    };
    loadData();
  }, [user]);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="p-0">
          @{user.displayName}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="flex w-96 flex-col gap-5">
        <TypographyLarge>{user.displayName}</TypographyLarge>
        <TypographyMuted>{dictionary.location[user.location]}</TypographyMuted>
        <TypographyMuted>
          {user.about ?? dictionary.dashboard["user.profile.about-placeholder"]}
        </TypographyMuted>
        <BannerImage banner={activeBanner} />
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserHoverCard;
