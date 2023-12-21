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
    const loadData = async () => {
      if (userId !== "") {
        const userActiveBanner = await getUserActiveBanner(userId);
        setActiveBanner(userActiveBanner);
      }
    };
    loadData();
  }, [userId]);

  return activeBanner;
};

export default useUserActiveBanner;
