import { UserBannerIncluded } from "@/services/data-access/banner";
import React from "react";
import { Button } from "../ui/button";
import BannerImage from "../banner-image";

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
      <BannerImage banner={userBanner.banner} />
    </Button>
  );
};

export default UserBanner;
