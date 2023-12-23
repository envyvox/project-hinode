import { getProducts } from "@/services/data-access/product";
import { useQuery } from "react-query";

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
};
