import { deleteLotteryUsers } from "@/services/data-access/lottery";
import { useMutation, useQueryClient } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useDeleteLotteryUsersMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteLotteryUsers(),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ReactQueryKeys.lotteryUsers,
      });
    },
  });
};
