"use client";

import { useMemo } from "react";
import { UserBannerIncluded } from "@/services/data-access/banner";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserStore } from "@/store/user-store";
import { BannerRarity } from "@prisma/client";

import { useToggleUserActiveBannerMutation } from "@/hooks/mutations/use-toggle-user-active-banner-mutation";
import { useUserActiveBannerQuery } from "@/hooks/queries/use-user-active-banner-query";
import { useUserBannersQuery } from "@/hooks/queries/use-user-banners-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BannerImage from "@/components/banner-image";
import TypographySmall from "@/components/typography/small";
import UserBannersTabContent from "@/components/user-banner/user-banners";

type UserBannersByRarity = Record<string, UserBannerIncluded[]>;

const UserBanners = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const userId = useUserStore((state) => state.user).id;
  const { data: userActiveBanner } = useUserActiveBannerQuery();
  const { data: userBanners, isLoading } = useUserBannersQuery();
  const { mutate: toggleUserBanner } = useToggleUserActiveBannerMutation();
  const bannerTabs = Object.keys(BannerRarity);

  const userBannersByRarity = useMemo(() => {
    return (
      userBanners?.reduce((acc: UserBannersByRarity, banner) => {
        const rarity = banner.banner.rarity as string;

        if (!acc[rarity]) {
          acc[rarity] = [];
        }

        acc[rarity].push(banner);

        return acc;
      }, {} as UserBannersByRarity) ?? ({} as UserBannersByRarity)
    );
  }, [userBanners]);

  const handleBannerSelect = async (userBanner: UserBannerIncluded) => {
    toggleUserBanner({
      userId: userId,
      bannerId: userActiveBanner!.bannerId,
      isActive: false,
    });
    toggleUserBanner({
      userId: userId,
      bannerId: userBanner.bannerId,
      isActive: true,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-5">
      <TypographySmall>
        {dictionary.dashboard["user.banners.active-banner"]}
      </TypographySmall>
      <div>
        <BannerImage banner={userActiveBanner?.banner} />
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
              loading={isLoading}
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
