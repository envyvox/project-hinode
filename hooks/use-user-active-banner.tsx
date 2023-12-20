import {
  UserBannerIncluded,
  getUserActiveBanner,
} from "@/services/data-access/banner";
import { useUserStore } from "@/store/user-store";
import { useEffect, useState } from "react";

const useUserActiveBanner = () => {
  const userId = useUserStore((state) => state.user).id;
  const [activeBanner, setActiveBanner] = useState<UserBannerIncluded>();

  useEffect(() => {
    if (userId !== "") {
      getUserActiveBanner(userId).then(setActiveBanner);
    }
  }, [userId]);

  return activeBanner;
};

export default useUserActiveBanner;
