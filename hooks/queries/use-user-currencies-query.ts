import { getUserCurrencies } from "@/services/data-access/currency";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

export const useUserCurrenciesQuery = () => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ["user-currencies", user.id],
    queryFn: () => getUserCurrencies(user.id),
  });
};
