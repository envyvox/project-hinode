import { getUserCurrency } from "@/services/data-access/currency";
import { useUserStore } from "@/store/user-store";
import { Currency } from "@prisma/client";
import { useQuery } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useUserCurrencyQuery = (currency: Currency) => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ReactQueryKeys.userCurrency(user.id, currency),
    queryFn: () => getUserCurrency(user.id, currency),
  });
};
