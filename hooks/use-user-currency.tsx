import { useUserCurrencyStore } from "@/store/user-currency-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const useUserCurrency = () => {
  const userId = useUserStore((state) => state.user).id;
  const getUserCurrencies = useUserCurrencyStore(
    (state) => state.getUserCurrencies,
  );

  useEffect(() => {
    if (userId !== "") {
      getUserCurrencies(userId);
    }
  }, [userId, getUserCurrencies]);
};

export default useUserCurrency;
