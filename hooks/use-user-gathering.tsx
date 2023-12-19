import { useUserGatheringStore } from "@/store/user-gathering-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const useUserGathering = () => {
  const user = useUserStore((state) => state.user);
  const getUserGatherings = useUserGatheringStore(
    (state) => state.getUserGatherings,
  );

  useEffect(() => {
    if (user.id !== "") {
      getUserGatherings(user.id);
    }
  }, [user, getUserGatherings]);
};

export default useUserGathering;
