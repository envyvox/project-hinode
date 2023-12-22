"use client";

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
import React, { useEffect, useMemo, useState } from "react";
import BannerImage from "@/components/banner-image";

type UserBannersByRarity = Record<string, UserBannerIncluded[]>;

const UserBanners = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const userId = useUserStore((state) => state.user).id;
  const [userBanners, setUserBanners] = useState<UserBannerIncluded[]>([]);
  const [userActiveBanner, setUserActiveBanner] =
    useState<UserBannerIncluded>();
  const [loading, setLoading] = useState(true);
  const bannerTabs = Object.keys(BannerRarity);

  const userBannersByRarity = useMemo(() => {
    return userBanners.reduce((acc: UserBannersByRarity, banner) => {
      const rarity = banner.banner.rarity as string;

      if (!acc[rarity]) {
        acc[rarity] = [];
      }

      acc[rarity].push(banner);

      return acc;
    }, {} as UserBannersByRarity);
  }, [userBanners]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const userBanners = await getUserBanners(userId);

      setUserBanners(userBanners.filter((ub) => !ub.isActive));
      setUserActiveBanner(userBanners.find((ub) => ub.isActive));

      setLoading(false);
    };
    loadData();
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-5">
      <TypographySmall>
        {dictionary.dashboard["user.banners.active-banner"]}
      </TypographySmall>
      <div>
        {loading || !userActiveBanner ? (
          <Skeleton className="h-[95px]" />
        ) : (
          <BannerImage banner={userActiveBanner.banner} />
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
              loading={loading}
              userBanners={userBannersByRarity[tab as BannerRarity] || []}
              handleBannerSelect={handleBannerSelect}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default UserBanners;
