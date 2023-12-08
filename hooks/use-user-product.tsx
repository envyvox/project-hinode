import { useUserProductStore } from "@/store/user-product-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

export default function UseUserProduct() {
  const user = useUserStore((state) => state.user);
  const getUserProducts = useUserProductStore((state) => state.getUserProducts);

  useEffect(() => {
    if (user.id !== "") {
      getUserProducts(user.id);
    }
  }, [user, getUserProducts]);
}
