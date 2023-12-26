import {
  removeFishFromUser,
  UserFishIncluded,
} from "@/services/data-access/fish";
import { useUserStore } from "@/store/user-store";
import { useMutation, useQueryClient } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

type Props = {
  userId?: string;
  fishId: string;
  amount: number;
};

export const useRemoveUserFishMutation = () => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: ({ userId, fishId, amount }: Props) =>
      removeFishFromUser(userId ?? user.id, fishId, amount),
    onMutate: async ({ userId, fishId, amount }: Props) => {
      await queryClient.cancelQueries({
        queryKey: [ReactQueryKeys.userFish(userId ?? user.id)],
      });

      const previousUserFish = queryClient.getQueryData<UserFishIncluded[]>(
        ReactQueryKeys.userFish(userId ?? user.id)
      );

      if (previousUserFish) {
        queryClient.setQueryData<UserFishIncluded[]>(
          ReactQueryKeys.userFish(userId ?? user.id),
          previousUserFish.map((fish) => ({
            ...fish,
            amount: fish.fishId === fishId ? fish.amount - amount : fish.amount,
          }))
        );
      }

      return { previousUserFish };
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ReactQueryKeys.userFish(variables.userId ?? user.id),
      });
    },
  });
};
