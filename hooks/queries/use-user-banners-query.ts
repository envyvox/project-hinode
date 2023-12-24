import { getUserBanners } from "@/services/data-access/banner";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useUserBannersQuery = () => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ReactQueryKeys.userBanners(user.id),
    queryFn: () => getUserBanners(user.id),
  });
};
