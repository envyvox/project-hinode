import { GameUser } from "@/services/data-access/user";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import BannerImage from "./banner-image";
import { useDictionaryStore } from "@/store/dictionary-store";
import TypographyMuted from "./typography/muted";
import TypographyLarge from "./typography/large";
import { Button } from "./ui/button";
import { useUserActiveBannerQuery } from "@/hooks/queries/use-user-active-banner-query";
import Image from "next/image";

type Props = {
  user: GameUser;
};

const UserHoverCard = ({ user }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: userActiveBanner } = useUserActiveBannerQuery(user.id);

  return (
    <HoverCard>
      <div className="flex items-center gap-2">
        <Image
          className="inline h-6 w-6"
          width={27}
          height={27}
          src={`/title/${user.title}.png`}
          alt={user.title}
        />
        <TypographyMuted>{dictionary.title[user.title]}</TypographyMuted>
        <HoverCardTrigger asChild>
          <Button variant="link" className="p-0">
            @{user.displayName}
          </Button>
        </HoverCardTrigger>
      </div>
      <HoverCardContent className="flex w-96 flex-col gap-5">
        <TypographyLarge>{user.displayName}</TypographyLarge>
        <TypographyMuted>{dictionary.location[user.location]}</TypographyMuted>
        <TypographyMuted>
          {user.about ?? dictionary.dashboard["user.profile.about-placeholder"]}
        </TypographyMuted>
        <BannerImage banner={userActiveBanner?.banner} />
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserHoverCard;
