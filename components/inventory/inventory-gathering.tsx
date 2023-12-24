import { useDictionaryStore } from "@/store/dictionary-store";

import { useUserGatheringsQuery } from "@/hooks/queries/use-user-gatherings-query";

import InventoryEmpty from "./inventory-empty";
import InventoryItem from "./inventory-item";
import InventorySkeleton from "./inventory-skeleton";

const InventoryGathering = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: userGatherings, isLoading } = useUserGatheringsQuery();

  return (
    <div className="grid-xl-3">
      {isLoading ? (
        <InventorySkeleton />
      ) : userGatherings?.length ? (
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
