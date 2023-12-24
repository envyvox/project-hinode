import Image from "next/image";
import { useDictionaryStore } from "@/store/dictionary-store";
import { UserTitle } from "@prisma/client";

import TypographyLarge from "../typography/large";
import TypographyMuted from "../typography/muted";
import { Button } from "../ui/button";

type Props = {
  userTitle: UserTitle;
  handleTitleSelect: (userTitle: UserTitle) => void;
};

const UserTitleComponent = ({ userTitle, handleTitleSelect }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <Button
      variant="ghost"
      className="flex h-fit w-full justify-start gap-5 rounded-lg border bg-card p-5 text-card-foreground shadow-sm"
      onClick={() => handleTitleSelect(userTitle)}
    >
      <Image
        className="h-8 w-8"
        src={`/title/${userTitle.title}.png`}
        width={36}
        height={36}
        alt={userTitle.title}
      />
      <div className="flex flex-col gap-1 text-left">
        <TypographyLarge>{dictionary.title[userTitle.title]}</TypographyLarge>
        <TypographyMuted>
          {dictionary.dashboard["user.titles.title.createdAt"]}
          {new Date(userTitle.createdAt).toLocaleString("ru-RU", {
            hour: "2-digit",
            minute: "numeric",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </TypographyMuted>
      </div>
    </Button>
  );
};

export default UserTitleComponent;
