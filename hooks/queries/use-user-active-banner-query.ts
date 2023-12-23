import { ReactQueryKeys } from "@/lib/react-query-keys";
import { getUserActiveBanner } from "@/services/data-access/banner";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

export const useUserActiveBannerQuery = (userId?: string) => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ReactQueryKeys.userActiveBanner(userId ?? user.id),
    queryFn: () => getUserActiveBanner(userId ?? user.id),
  });
};
