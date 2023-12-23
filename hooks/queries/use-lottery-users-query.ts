import { ReactQueryKeys } from "@/lib/react-query-keys";
import { getLotteryUsers } from "@/services/data-access/lottery";
import { useQuery } from "react-query";

export const useLotteryUsersQuery = () => {
  return useQuery({
    queryKey: ReactQueryKeys.lotteryUsers,
    queryFn: () => getLotteryUsers(),
  });
};
