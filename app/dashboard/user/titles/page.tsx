"use client";

import ActiveUserTitle from "@/components/active-user-title";
import TypographySmall from "@/components/typography/small";
import { Skeleton } from "@/components/ui/skeleton";
import UserTitleComponent from "@/components/user-title";
import { getUserTitles } from "@/services/data-access/title";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserStore } from "@/store/user-store";
import { useEffect, useState } from "react";

const UserTitles = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const user = useUserStore((state) => state.user);
  const setUserTitle = useUserStore((state) => state.setUserTitle);
  const [userTitles, setUserTitles] = useState<UserTitleComponent[]>([]);
  const [userActiveTitle, setUserActiveTitle] = useState<UserTitleComponent>();

  useEffect(() => {
    getUserTitles(user.id).then((userTitles) => {
      setUserTitles(userTitles.filter((ut) => ut.title !== user.title));
      setUserActiveTitle(userTitles.find((ut) => ut.title === user.title));
    });
  }, [user]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        <TypographySmall>
          {dictionary.dashboard["user.titles.active-title"]}
        </TypographySmall>
        {userActiveTitle ? (
          <ActiveUserTitle
            dictionary={dictionary}
            userTitle={userActiveTitle}
          />
        ) : (
          <Skeleton className="h-[95px] w-[275px]" />
        )}
      </div>
      <div className="flex flex-col gap-5">
        <TypographySmall>
          {dictionary.dashboard["user.titles.all-titles"]}
        </TypographySmall>
        <div className="grid-xl-3">
          {userTitles.length ? (
            userTitles.map((ut) => (
              <UserTitleComponent
                key={ut.title}
                dictionary={dictionary}
                userTitle={ut}
                handleTitleSelect={() => setUserTitle(ut.title)}
              />
            ))
          ) : (
            <>
              <Skeleton className="h-[95px] w-full" />
              <Skeleton className="h-[95px] w-full" />
              <Skeleton className="h-[95px] w-full" />
              <Skeleton className="h-[95px] w-full" />
              <Skeleton className="h-[95px] w-full" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTitles;
