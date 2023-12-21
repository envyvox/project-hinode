import { useUserCurrencyStore } from "@/store/user-currency-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const useUserCurrency = () => {
  const userId = useUserStore((state) => state.user).id;
  const userCurrencies = useUserCurrencyStore((state) => state.userCurrencies);
  const getUserCurrencies = useUserCurrencyStore(
    (state) => state.getUserCurrencies,
  );

  useEffect(() => {
    const loadData = async () => {
      if (userId !== "" && userCurrencies.length === 0) {
        await getUserCurrencies(userId);
      }
    };
    loadData();
  }, [userId, userCurrencies, getUserCurrencies]);
};

export default useUserCurrency;
