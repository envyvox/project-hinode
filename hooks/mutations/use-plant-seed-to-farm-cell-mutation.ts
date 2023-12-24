import { plantSeedToCell } from "@/services/data-access/farm";
import { useUserStore } from "@/store/user-store";
import { useMutation, useQueryClient } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

type Props = {
  cellId: string;
  seedId: string;
};

export const usePlantSeedToCellMutation = () => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: ({ cellId, seedId }: Props) => plantSeedToCell(cellId, seedId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ReactQueryKeys.userFarmCells(user.id),
      });
    },
  });
};
