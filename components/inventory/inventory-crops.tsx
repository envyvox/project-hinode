import { useDictionaryStore } from "@/store/dictionary-store";
import InventorySkeleton from "./inventory-skeleton";
import InventoryItem from "./inventory-item";
import InventoryEmpty from "./inventory-empty";
import { useUserCropsQuery } from "@/hooks/queries/use-user-crops-query";

const InventoryCrops = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: userCrops, isLoading } = useUserCropsQuery();

  return (
    <div className="grid-xl-3">
      {isLoading ? (
        <InventorySkeleton />
      ) : userCrops?.length ? (
        userCrops.map((userCrop) => (
          <InventoryItem
            key={userCrop.cropId}
            src={`/crop/${userCrop.crop.name}.png`}
            // @ts-ignore Implicit any
            name={dictionary.item.crop[userCrop.crop.name]}
            amount={userCrop.amount}
          />
        ))
      ) : (
        <InventoryEmpty
          label={dictionary.dashboard["user.inventory.crop.empty"]}
        />
      )}
    </div>
  );
};

export default InventoryCrops;
