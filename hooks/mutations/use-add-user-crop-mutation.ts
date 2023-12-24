import { addCropToUser } from "@/services/data-access/crop";
import { useUserStore } from "@/store/user-store";
import { useMutation, useQueryClient } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

type Props = {
  userId?: string;
  cropId: string;
  amount: number;
};

export const useAddUserCropMutation = () => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: ({ userId, cropId, amount }: Props) =>
      addCropToUser(userId ?? user.id, cropId, amount),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ReactQueryKeys.userCrops(variables.userId ?? user.id),
      });
    },
  });
};
