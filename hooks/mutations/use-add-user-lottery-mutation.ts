import { createLotteryUser } from "@/services/data-access/lottery";
import { useUserStore } from "@/store/user-store";
import { useMutation, useQueryClient } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

type Props = {
  userId?: string;
};

export const useAddUserLotteryMutation = () => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: ({ userId }: Props) => createLotteryUser(userId ?? user.id),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ReactQueryKeys.userLottery(variables.userId ?? user.id),
      });
      queryClient.invalidateQueries({
        queryKey: ReactQueryKeys.lotteryUsers,
      });
    },
  });
};
