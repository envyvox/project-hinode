"use client";

import UserActiveBanner from "@/components/user-banner/user-active-banner";
import TypographySmall from "@/components/typography/small";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserBannersTabContent from "@/components/user-banner/user-banners";
import {
  UserBannerIncluded,
  getUserBanners,
  toggleUserBanner,
} from "@/services/data-access/banner";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserStore } from "@/store/user-store";
import { BannerRarity } from "@prisma/client";
import React, { useEffect, useState } from "react";

const UserBanners = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const userId = useUserStore((state) => state.user).id;
  const [userBanners, setUserBanners] = useState<UserBannerIncluded[]>([]);
  const [userActiveBanner, setUserActiveBanner] =
    useState<UserBannerIncluded>();
  const [loading, setLoading] = useState(true);
  const bannerTabs = Object.keys(BannerRarity);

  useEffect(() => {
    setLoading(true);
    getUserBanners(userId).then((userBanners) => {
      setUserBanners(userBanners.filter((ub) => !ub.isActive));
      setUserActiveBanner(userBanners.find((ub) => ub.isActive));
      setLoading(false);
    });
  }, [userId]);

  const handleBannerSelect = async (userBanner: UserBannerIncluded) => {
    await toggleUserBanner(userId, userActiveBanner!.bannerId, false);
    await toggleUserBanner(userId, userBanner.bannerId, true);

    setUserActiveBanner(userBanner);
    setUserBanners((prevUserBanners) => {
      const updatedUserBanners = [...prevUserBanners];
      updatedUserBanners.push(userActiveBanner!);
      updatedUserBanners.splice(
        updatedUserBanners.findIndex(
          (ub) => ub.bannerId === userBanner.bannerId,
        ),
        1,
      );
      return updatedUserBanners;
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <TypographySmall>
        {dictionary.dashboard["user.banners.active-banner"]}
      </TypographySmall>
      <div className="">
        {loading || !userActiveBanner ? (
          <Skeleton className="h-[95px]" />
        ) : (
          <UserActiveBanner userBanner={userActiveBanner} />
        )}
      </div>
      <TypographySmall>
        {dictionary.dashboard["user.banners.all-banners"]}
      </TypographySmall>
      <Tabs defaultValue={BannerRarity.Common}>
        <TabsList className="flex w-full flex-wrap justify-start gap-x-5">
          {bannerTabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="min-h-[32px] min-w-[100px]"
            >
              {dictionary.bannerRarity[tab as BannerRarity]}
            </TabsTrigger>
          ))}
        </TabsList>
        {bannerTabs.map((tab) => (
          <TabsContent key={tab} value={tab}>
            <UserBannersTabContent
              dictionary={dictionary}
              loading={loading}
              userBanners={userBanners.filter((ub) => ub.banner.rarity === tab)}
              handleBannerSelect={handleBannerSelect}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default UserBanners;
