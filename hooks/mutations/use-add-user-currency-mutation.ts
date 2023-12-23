import { ReactQueryKeys } from "@/lib/react-query-keys";
import { addCurrencyToUser } from "@/services/data-access/currency";
import { useUserStore } from "@/store/user-store";
import { Currency } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";

type Props = {
  userId?: string;
  currency: Currency;
  amount: number;
};

export const useAddUserCurrencyMutation = () => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: ({ userId, currency, amount }: Props) =>
      addCurrencyToUser(userId ?? user.id, currency, amount),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ReactQueryKeys.userCurrency(
          variables.userId ?? user.id,
          variables.currency,
        ),
      });
      queryClient.invalidateQueries({
        queryKey: ReactQueryKeys.userCurrencies(variables.userId ?? user.id),
      });
    },
  });
};
