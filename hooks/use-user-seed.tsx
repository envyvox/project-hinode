import { useUserSeedStore } from "@/store/user-seed-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const useUserSeed = () => {
  const userId = useUserStore((state) => state.user).id;
  const getUserSeeds = useUserSeedStore((state) => state.getUserSeeds);

  useEffect(() => {
    if (userId !== "") {
      console.log("useUserSeed", userId);
      getUserSeeds(userId);
    }
  }, [userId, getUserSeeds]);
};

export default useUserSeed;
