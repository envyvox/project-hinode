import { getUserProducts } from "@/services/data-access/product";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

export const useUserProductsQuery = () => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ["user-product", user.id],
    queryFn: () => getUserProducts(user.id),
  });
};
