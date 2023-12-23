import { getUserCurrency } from "@/services/data-access/currency";
import { useUserStore } from "@/store/user-store";
import { Currency } from "@prisma/client";
import { useQuery } from "react-query";

export const useUserCurrencyQuery = (currency: Currency) => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ["user-currency", user.id, currency],
    queryFn: () => getUserCurrency(user.id, currency),
  });
};
