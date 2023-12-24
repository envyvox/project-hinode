import { UserBannerIncluded } from "@/services/data-access/banner";

import BannerImage from "../banner-image";
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
      <BannerImage banner={userBanner.banner} />
    </Button>
  );
};

export default UserBanner;
