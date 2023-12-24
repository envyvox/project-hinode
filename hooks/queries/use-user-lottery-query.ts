import { getUserLottery } from "@/services/data-access/lottery";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useUserLotteryQuery = (userId?: string) => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ReactQueryKeys.userLottery(userId ?? user.id),
    queryFn: () => getUserLottery(userId ?? user.id),
  });
};
