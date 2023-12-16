import { useUserCurrencyStore } from "@/store/user-currency-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const UseUserCurrency = () => {
  const user = useUserStore((state) => state.user);
  const getUserCurrencies = useUserCurrencyStore(
    (state) => state.getUserCurrencies,
  );

  useEffect(() => {
    if (user.id !== "") {
      getUserCurrencies(user.id);
    }
  }, [user, getUserCurrencies]);
};

export default UseUserCurrency;
