import { useUserSeedStore } from "@/store/user-seed-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const useUserSeed = () => {
  const user = useUserStore((state) => state.user);
  const getUserSeeds = useUserSeedStore((state) => state.getUserSeeds);

  useEffect(() => {
    if (user.id !== "") {
      getUserSeeds(user.id);
    }
  }, [user, getUserSeeds]);
};

export default useUserSeed;
