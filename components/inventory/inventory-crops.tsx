import useUserCrop from "@/hooks/use-user-crop";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserCropStore } from "@/store/user-crop-store";
import InventorySkeleton from "./inventory-skeleton";
import InventoryItem from "./inventory-item";
import InventoryEmpty from "./inventory-empty";

const InventoryCrops = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const loading = useUserCropStore((state) => state.loading);
  const userCrops = useUserCropStore((state) => state.userCrops);

  useUserCrop();

  return (
    <div className="grid-xl-3">
      {loading ? (
        <InventorySkeleton />
      ) : userCrops.length ? (
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
