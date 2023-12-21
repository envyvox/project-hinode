import { useUserProductStore } from "@/store/user-product-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const useUserProduct = () => {
  const userId = useUserStore((state) => state.user).id;
  const userProducts = useUserProductStore((state) => state.userProducts);
  const getUserProducts = useUserProductStore((state) => state.getUserProducts);

  useEffect(() => {
    const loadData = async () => {
      if (userId !== "" && userProducts.length === 0) {
        await getUserProducts(userId);
      }
    };
    loadData();
  }, [userId, userProducts, getUserProducts]);
};

export default useUserProduct;
