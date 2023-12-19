import UseUserFish from "@/hooks/use-user-fish";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserFishStore } from "@/store/user-fish-store";
import InventorySkeleton from "./inventory-skeleton";
import { getRarityBorderColor } from "@/util/get-rarity-border-color";
import InventoryItem from "./inventory-item";
import InventoryEmpty from "./inventory-empty";

const InventoryFish = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const loading = useUserFishStore((state) => state.loading);
  const userFish = useUserFishStore((state) => state.userFish);

  UseUserFish();

  return (
    <div className="grid-xl-3">
      {loading ? (
        <InventorySkeleton />
      ) : userFish.length ? (
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
