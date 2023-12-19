import useUserBox from "@/hooks/use-user-box";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserBoxStore } from "@/store/user-box-store";
import InventorySkeleton from "./inventory-skeleton";
import InventoryItem from "./inventory-item";
import InventoryEmpty from "./inventory-empty";

const InventoryBoxes = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const loading = useUserBoxStore((state) => state.loading);
  const userBoxes = useUserBoxStore((state) => state.userBoxes);

  useUserBox();

  return (
    <div className="grid-xl-3">
      {loading ? (
        <InventorySkeleton />
      ) : userBoxes.length ? (
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
