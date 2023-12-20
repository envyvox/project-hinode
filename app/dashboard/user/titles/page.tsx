"use client";

import ActiveUserTitle from "@/components/active-user-title";
import TypographySmall from "@/components/typography/small";
import { Skeleton } from "@/components/ui/skeleton";
import UserTitleComponent from "@/components/user-title";
import UserTitlesEmpty from "@/components/user-titles-empty";
import UserTitlesSkeleton from "@/components/user-titles-skeleton";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUserTitles(user.id).then((userTitles) => {
      setUserTitles(userTitles.filter((ut) => ut.title !== user.title));
      setUserActiveTitle(userTitles.find((ut) => ut.title === user.title));
      setLoading(false);
    });
  }, [user]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        <TypographySmall>
          {dictionary.dashboard["user.titles.active-title"]}
        </TypographySmall>
        <div className="grid-xl-3">
          {userActiveTitle ? (
            <ActiveUserTitle
              dictionary={dictionary}
              userTitle={userActiveTitle}
            />
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
          {loading ? (
            <UserTitlesSkeleton />
          ) : userTitles.length ? (
            userTitles.map((ut) => (
              <UserTitleComponent
                key={ut.title}
                dictionary={dictionary}
                userTitle={ut}
                handleTitleSelect={() => setUserTitle(ut.title)}
              />
            ))
          ) : (
            <UserTitlesEmpty
              label={dictionary.dashboard["user.titles.empty"]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTitles;
