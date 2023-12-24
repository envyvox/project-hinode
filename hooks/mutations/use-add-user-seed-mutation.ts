import { addSeedToUser } from "@/services/data-access/seed";
import { useUserStore } from "@/store/user-store";
import { useMutation, useQueryClient } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

type Props = {
  userId?: string;
  seedId: string;
  amount: number;
};

export const useAddUserSeedMutation = () => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: ({ userId, seedId, amount }: Props) =>
      addSeedToUser(userId ?? user.id, seedId, amount),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ReactQueryKeys.userSeeds(variables.userId ?? user.id),
      });
    },
  });
};
