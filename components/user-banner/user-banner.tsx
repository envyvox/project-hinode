import { UserBannerIncluded } from "@/services/data-access/banner";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  userBanner: UserBannerIncluded;
  handleBannerSelect: () => void;
};

const UserBanner = ({ userBanner, handleBannerSelect }: Props) => {
  return (
    <Button
      className="h-fit w-fit p-0 hover:bg-inherit"
      variant="ghost"
      onClick={handleBannerSelect}
    >
      <Image
        width={700}
        height={200}
        className="rounded-lg shadow-md"
        src={`/banner/${userBanner.banner.rarity}/${userBanner.bannerId}${
          userBanner.banner.rarity === "Animated" ? ".gif" : ".png"
        }`}
        alt="Active user banner"
      />
    </Button>
  );
};

export default UserBanner;
