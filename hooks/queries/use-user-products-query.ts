import { getUserProducts } from "@/services/data-access/product";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useUserProductsQuery = () => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ReactQueryKeys.userProducts(user.id),
    queryFn: () => getUserProducts(user.id),
  });
};
