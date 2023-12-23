import { useDictionaryStore } from "@/store/dictionary-store";
import InventorySkeleton from "./inventory-skeleton";
import { getRarityBorderColor } from "@/util/get-rarity-border-color";
import InventoryItem from "./inventory-item";
import InventoryEmpty from "./inventory-empty";
import { useUserFishQuery } from "@/hooks/queries/use-user-fish-query";

const InventoryFish = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: userFish, isLoading } = useUserFishQuery();

  return (
    <div className="grid-xl-3">
      {isLoading ? (
        <InventorySkeleton />
      ) : userFish?.length ? (
        userFish.map((uf) => (
          <InventoryItem
            key={uf.fishId}
            src={`/fish/${uf.fish.name}.png`}
            // @ts-ignore Implicit any
            name={dictionary.item.fish[uf.fish.name]}
            amount={uf.amount}
            className={getRarityBorderColor(uf.fish.rarity)}
          />
        ))
      ) : (
        <InventoryEmpty
          label={dictionary.dashboard["user.inventory.fish.empty"]}
        />
      )}
    </div>
  );
};

export default InventoryFish;
