import { useUserGatheringStore } from "@/store/user-gathering-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const useUserGathering = () => {
  const userId = useUserStore((state) => state.user).id;
  const getUserGatherings = useUserGatheringStore(
    (state) => state.getUserGatherings,
  );

  useEffect(() => {
    if (userId !== "") {
      getUserGatherings(userId);
    }
  }, [userId, getUserGatherings]);
};

export default useUserGathering;
