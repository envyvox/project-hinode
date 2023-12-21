import { useUserSeedStore } from "@/store/user-seed-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const useUserSeed = () => {
  const userId = useUserStore((state) => state.user).id;
  const userSeeds = useUserSeedStore((state) => state.userSeeds);
  const getUserSeeds = useUserSeedStore((state) => state.getUserSeeds);

  useEffect(() => {
    const loadData = async () => {
      if (userId !== "" && userSeeds.length === 0) {
        await getUserSeeds(userId);
      }
    };
    loadData();
  }, [userId, userSeeds, getUserSeeds]);
};

export default useUserSeed;
