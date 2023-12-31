import { useDictionaryStore } from "@/store/dictionary-store";

import { useUserSeedsQuery } from "@/hooks/queries/use-user-seeds-query";

import InventoryEmpty from "./inventory-empty";
import InventoryItem from "./inventory-item";
import InventorySkeleton from "./inventory-skeleton";

const InventorySeeds = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: userSeeds, isLoading } = useUserSeedsQuery();

  return (
    <div className="grid-xl-3">
      {isLoading ? (
        <InventorySkeleton />
      ) : userSeeds?.length ? (
        userSeeds.map((userSeed) => (
          <InventoryItem
            key={userSeed.seedId}
            src={`/seed/${userSeed.seed.name}.png`}
            // @ts-ignore Implicit any
            name={dictionary.item.seed[userSeed.seed.name]}
            amount={userSeed.amount}
          />
        ))
      ) : (
        <InventoryEmpty
          label={dictionary.dashboard["user.inventory.seed.empty"]}
        />
      )}
    </div>
  );
};

export default InventorySeeds;
