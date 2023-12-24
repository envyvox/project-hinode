import { removeSeedFromUser } from "@/services/data-access/seed";
import { useUserStore } from "@/store/user-store";
import { useMutation, useQueryClient } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

type Props = {
  seedId: string;
  amount: number;
};

export const useRemoveUserSeedMutation = () => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: ({ seedId, amount }: Props) =>
      removeSeedFromUser(user.id, seedId, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ReactQueryKeys.userSeeds(user.id),
      });
    },
  });
};
