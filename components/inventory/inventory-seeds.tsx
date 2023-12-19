import useUserSeed from "@/hooks/use-user-seed";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserSeedStore } from "@/store/user-seed-store";
import InventorySkeleton from "./inventory-skeleton";
import InventoryItem from "./inventory-item";
import InventoryEmpty from "./inventory-empty";

const InventorySeeds = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const loading = useUserSeedStore((state) => state.loading);
  const userSeeds = useUserSeedStore((state) => state.userSeeds);

  useUserSeed();

  return (
    <div className="grid-xl-3">
      {loading ? (
        <InventorySkeleton />
      ) : userSeeds.length ? (
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
