"use client";

import UserActiveTitle from "@/components/user-title/user-active-title";
import TypographySmall from "@/components/typography/small";
import { Skeleton } from "@/components/ui/skeleton";
import UserTitleComponent from "@/components/user-title/user-title";
import UserTitlesEmpty from "@/components/user-title/user-titles-empty";
import UserTitlesSkeleton from "@/components/user-title/user-titles-skeleton";
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
    const loadData = async () => {
      setLoading(true);

      const userTitles = await getUserTitles(user.id);

      setUserTitles(userTitles.filter((ut) => ut.title !== user.title));
      setUserActiveTitle(userTitles.find((ut) => ut.title === user.title));

      setLoading(false);
    };
    loadData();
  }, [user]);

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
          {loading ? (
            <UserTitlesSkeleton />
          ) : userTitles.length ? (
            userTitles.map((ut) => (
              <UserTitleComponent
                key={ut.title}
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
