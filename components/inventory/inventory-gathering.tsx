import useUserGathering from "@/hooks/use-user-gathering";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserGatheringStore } from "@/store/user-gathering-store";
import InventorySkeleton from "./inventory-skeleton";
import InventoryItem from "./inventory-item";
import InventoryEmpty from "./inventory-empty";

const InventoryGathering = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const loading = useUserGatheringStore((state) => state.loading);
  const userGatherings = useUserGatheringStore((state) => state.userGatherings);

  useUserGathering();

  return (
    <div className="grid-xl-3">
      {loading ? (
        <InventorySkeleton />
      ) : userGatherings.length ? (
        userGatherings.map((userGathering) => (
          <InventoryItem
            key={userGathering.gatheringId}
            src={`/gathering/${userGathering.gathering.name}.png`}
            // @ts-ignore Implicit any
            name={dictionary.item.gathering[userGathering.gathering.name]}
            amount={userGathering.amount}
          />
        ))
      ) : (
        <InventoryEmpty
          label={dictionary.dashboard["user.inventory.gathering.empty"]}
        />
      )}
    </div>
  );
};

export default InventoryGathering;
