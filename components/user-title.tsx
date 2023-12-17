import { UserTitle as UserTitleComponent } from "@prisma/client";
import React from "react";
import Image from "next/image";
import TypographyLarge from "./typography/large";
import { Button } from "./ui/button";
import TypographyMuted from "./typography/muted";
import { Dictionary } from "@/store/dictionary-store";

type Props = {
  dictionary: Dictionary;
  userTitle: UserTitleComponent;
  handleTitleSelect: (userTitle: UserTitleComponent) => void;
};

const UserTitleComponent = ({
  dictionary,
  userTitle,
  handleTitleSelect,
}: Props) => {
  return (
    <Button
      variant="ghost"
      className="flex h-fit w-full items-center gap-5 rounded-lg border bg-card p-5 text-card-foreground shadow-sm"
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
        <TypographyLarge>{userTitle.title}</TypographyLarge>
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
