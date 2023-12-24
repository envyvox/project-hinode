import { getUserCurrencies } from "@/services/data-access/currency";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useUserCurrenciesQuery = () => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ReactQueryKeys.userCurrencies(user.id),
    queryFn: () => getUserCurrencies(user.id),
  });
};
