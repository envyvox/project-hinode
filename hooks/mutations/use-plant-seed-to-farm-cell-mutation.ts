import { plantSeedToCell } from "@/services/data-access/farm";
import { useUserStore } from "@/store/user-store";
import { FarmCellState, Weather } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

import { useWorldStateQuery } from "../queries/use-world-state-query";

type Props = {
  cellId: string;
  seedId: string;
};

export const usePlantSeedToCellMutation = () => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  const { data: worldState } = useWorldStateQuery();

  return useMutation({
    mutationFn: ({ cellId, seedId }: Props) =>
      plantSeedToCell(
        cellId,
        seedId,
        worldState?.weatherToday === Weather.Clear
          ? FarmCellState.Planted
          : FarmCellState.Watered
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ReactQueryKeys.userFarmCells(user.id),
      });
    },
  });
};
