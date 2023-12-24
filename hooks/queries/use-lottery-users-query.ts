import { getLotteryUsers } from "@/services/data-access/lottery";
import { useQuery } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useLotteryUsersQuery = () => {
  return useQuery({
    queryKey: ReactQueryKeys.lotteryUsers,
    queryFn: () => getLotteryUsers(),
  });
};
