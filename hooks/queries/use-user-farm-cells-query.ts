import { getUserFarmCells } from "@/services/data-access/farm";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useUserFarmCellsQuery = () => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ReactQueryKeys.userFarmCells(user.id),
    queryFn: () => getUserFarmCells(user.id),
  });
};
