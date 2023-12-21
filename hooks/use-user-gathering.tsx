import { useUserGatheringStore } from "@/store/user-gathering-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const useUserGathering = () => {
  const userId = useUserStore((state) => state.user).id;
  const userGatherins = useUserGatheringStore((state) => state.userGatherings);
  const getUserGatherings = useUserGatheringStore(
    (state) => state.getUserGatherings,
  );

  useEffect(() => {
    const loadData = async () => {
      if (userId !== "" && userGatherins.length === 0) {
        await getUserGatherings(userId);
      }
    };
    loadData();
  }, [userId, userGatherins, getUserGatherings]);
};

export default useUserGathering;
