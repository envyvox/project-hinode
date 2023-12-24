import { getUserActiveBanner } from "@/services/data-access/banner";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useUserActiveBannerQuery = (userId?: string) => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ReactQueryKeys.userActiveBanner(userId ?? user.id),
    queryFn: () => getUserActiveBanner(userId ?? user.id),
  });
};
