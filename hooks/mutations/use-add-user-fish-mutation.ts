import { ReactQueryKeys } from "@/lib/react-query-keys";
import { addFishToUser } from "@/services/data-access/fish";
import { useUserStore } from "@/store/user-store";
import { useMutation, useQueryClient } from "react-query";

type Props = {
  userId?: string;
  fishId: string;
  amount: number;
};

export const useAddUserFishMutation = () => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: ({ userId, fishId, amount }: Props) =>
      addFishToUser(userId ?? user.id, fishId, amount),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ReactQueryKeys.userFish(variables.userId ?? user.id),
      });
    },
  });
};
