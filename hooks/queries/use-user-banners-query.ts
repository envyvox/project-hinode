import { getUserBanners } from "@/services/data-access/banner";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

export const useUserBannersQuery = () => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ["user-banners", user.id],
    queryFn: () => getUserBanners(user.id),
  });
};
