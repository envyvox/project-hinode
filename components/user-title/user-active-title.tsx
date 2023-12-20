import { Dictionary } from "@/store/dictionary-store";
import { UserTitle } from "@prisma/client";
import Image from "next/image";
import React from "react";
import TypographyLarge from "../typography/large";
import TypographyMuted from "../typography/muted";

type Props = {
  dictionary: Dictionary;
  userTitle: UserTitle;
};

const UserActiveTitle = ({ dictionary, userTitle }: Props) => {
  return (
    <div className="flex w-full items-center gap-5 rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
      <Image
        className="h-8 w-8"
        src={`/title/${userTitle.title}.png`}
        width={36}
        height={36}
        alt={userTitle.title}
      />
      <div className="flex flex-col gap-1">
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
    </div>
  );
};

export default UserActiveTitle;
