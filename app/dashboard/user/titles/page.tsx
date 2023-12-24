"use client";

import { useEffect, useState } from "react";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserStore } from "@/store/user-store";
import { UserTitle } from "@prisma/client";

import { useUserTitlesQuery } from "@/hooks/queries/use-user-titles-query";
import { Skeleton } from "@/components/ui/skeleton";
import TypographySmall from "@/components/typography/small";
import UserActiveTitle from "@/components/user-title/user-active-title";
import UserTitleComponent from "@/components/user-title/user-title";
import UserTitlesSkeleton from "@/components/user-title/user-titles-skeleton";

const UserTitles = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const user = useUserStore((state) => state.user);
  const setUserTitle = useUserStore((state) => state.setUserTitle);
  const { data: userTitles, isLoading } = useUserTitlesQuery();
  const [userActiveTitle, setUserActiveTitle] = useState<UserTitle>();

  useEffect(() => {
    setUserActiveTitle(userTitles?.find((ut) => ut.title === user.title));
  }, [user, userTitles]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        <TypographySmall>
          {dictionary.dashboard["user.titles.active-title"]}
        </TypographySmall>
        <div className="grid-xl-3">
          {userActiveTitle ? (
            <UserActiveTitle userTitle={userActiveTitle} />
          ) : (
            <Skeleton className="h-[95px]" />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <TypographySmall>
          {dictionary.dashboard["user.titles.all-titles"]}
        </TypographySmall>
        <div className="grid-xl-3">
          {isLoading ? (
            <UserTitlesSkeleton />
          ) : (
            userTitles?.map((ut) => (
              <UserTitleComponent
                key={ut.title}
                userTitle={ut}
                handleTitleSelect={() => setUserTitle(ut.title)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTitles;
