import { useDictionaryStore } from "@/store/dictionary-store";
import InventorySkeleton from "./inventory-skeleton";
import InventoryItem from "./inventory-item";
import InventoryEmpty from "./inventory-empty";
import { useUserBoxesQuery } from "@/hooks/queries/use-user-boxes-query";

const InventoryBoxes = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: userBoxes, isLoading } = useUserBoxesQuery();

  return (
    <div className="grid-xl-3">
      {isLoading ? (
        <InventorySkeleton />
      ) : userBoxes?.length ? (
        userBoxes.map((userBox) => (
          <InventoryItem
            key={userBox.box}
            src={`/box/Box${userBox.box.toString()}.png`}
            name={dictionary.item.box[userBox.box]}
            amount={userBox.amount}
          />
        ))
      ) : (
        <InventoryEmpty
          label={dictionary.dashboard["user.inventory.box.empty"]}
        />
      )}
    </div>
  );
};

export default InventoryBoxes;
