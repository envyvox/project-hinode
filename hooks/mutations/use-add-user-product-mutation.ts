import { addProductToUser } from "@/services/data-access/product";
import { useUserStore } from "@/store/user-store";
import { useMutation, useQueryClient } from "react-query";

type Props = {
  userId?: string;
  productId: string;
  amount: number;
};

export const useAddUserProductMutation = () => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: ({ userId, productId, amount }: Props) =>
      addProductToUser(userId ?? user.id, productId, amount),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ["user-products", variables.userId ?? user.id],
      });
    },
  });
};
