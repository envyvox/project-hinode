import { useUserProductStore } from "@/store/user-product-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const useUserProduct = () => {
  const userId = useUserStore((state) => state.user).id;
  const getUserProducts = useUserProductStore((state) => state.getUserProducts);

  useEffect(() => {
    if (userId !== "") {
      getUserProducts(userId);
    }
  }, [userId, getUserProducts]);
};

export default useUserProduct;
