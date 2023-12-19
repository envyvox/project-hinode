import useUserCurrency from "@/hooks/use-user-currency";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserCurrencyStore } from "@/store/user-currency-store";
import InventorySkeleton from "./inventory-skeleton";
import InventoryItem from "./inventory-item";
import InventoryEmpty from "./inventory-empty";

const InventoryCurrency = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const loading = useUserCurrencyStore((state) => state.loading);
  const userCurrencies = useUserCurrencyStore((state) => state.userCurrencies);

  useUserCurrency();

  return (
    <div className="grid-xl-3">
      {loading ? (
        <InventorySkeleton />
      ) : userCurrencies.length ? (
        userCurrencies.map((userCurrency) => (
          <InventoryItem
            key={userCurrency.currency}
            src={`/currency/${userCurrency.currency.toString()}.png`}
            name={dictionary.item.currency[userCurrency.currency]}
            amount={userCurrency.amount}
          />
        ))
      ) : (
        <InventoryEmpty
          label={dictionary.dashboard["user.inventory.currency.empty"]}
        />
      )}
    </div>
  );
};

export default InventoryCurrency;
