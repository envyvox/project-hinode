import { useUserFishStore } from "@/store/user-fish-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const useUserFish = () => {
  const userId = useUserStore((state) => state.user).id;
  const userFish = useUserFishStore((state) => state.userFish);
  const getUserFish = useUserFishStore((state) => state.getUserFish);

  useEffect(() => {
    const loadData = async () => {
      if (userId !== "" && userFish.length === 0) {
        await getUserFish(userId);
      }
    };
    loadData();
  }, [userId, userFish, getUserFish]);
};

export default useUserFish;
