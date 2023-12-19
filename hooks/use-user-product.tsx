import { useUserProductStore } from "@/store/user-product-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const useUserProduct = () => {
  const user = useUserStore((state) => state.user);
  const getUserProducts = useUserProductStore((state) => state.getUserProducts);

  useEffect(() => {
    if (user.id !== "") {
      getUserProducts(user.id);
    }
  }, [user, getUserProducts]);
};

export default useUserProduct;
