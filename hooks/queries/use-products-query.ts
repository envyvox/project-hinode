import { getProducts } from "@/services/data-access/product";
import { useQuery } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ReactQueryKeys.products,
    queryFn: () => getProducts(),
  });
};
