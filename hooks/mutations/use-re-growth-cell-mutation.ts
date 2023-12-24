import { reGrowthCell } from "@/services/data-access/farm";
import { useUserStore } from "@/store/user-store";
import { useMutation, useQueryClient } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useReGrowthCellMutation = () => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: (cellId: string) => reGrowthCell(cellId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ReactQueryKeys.userFarmCells(user.id),
      });
    },
  });
};
