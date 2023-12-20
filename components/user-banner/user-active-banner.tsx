import { UserBannerIncluded } from "@/services/data-access/banner";
import Image from "next/image";
import React from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {
  userBanner: UserBannerIncluded | undefined;
};

const UserActiveBanner = ({ userBanner }: Props) => {
  return userBanner ? (
    <Image
      className="rounded-lg"
      width={700}
      height={userBanner.banner.rarity === "Rare" ? 200 : 150}
      src={`/banner/${userBanner.banner.rarity}/${userBanner.bannerId}${
        userBanner.banner.rarity === "Animated" ? ".gif" : ".png"
      }`}
      alt="Active user banner"
    />
  ) : (
    <Skeleton className="h-[200px] w-[700px]" />
  );
};

export default UserActiveBanner;
