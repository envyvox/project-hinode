import { useDictionaryStore } from "@/store/dictionary-store";
import InventorySkeleton from "./inventory-skeleton";
import InventoryItem from "./inventory-item";
import InventoryEmpty from "./inventory-empty";
import { useUserCurrenciesQuery } from "@/hooks/queries/use-user-currencies-query";

const InventoryCurrency = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: userCurrencies, isLoading } = useUserCurrenciesQuery();

  return (
    <div className="grid-xl-3">
      {isLoading ? (
        <InventorySkeleton />
      ) : userCurrencies?.length ? (
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
