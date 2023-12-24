import { waterCell } from "@/services/data-access/farm";
import { useUserStore } from "@/store/user-store";
import { useMutation, useQueryClient } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useWaterCellMutation = () => {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cellId: string) => waterCell(cellId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ReactQueryKeys.userFarmCells(user.id),
      });
    },
  });
};
