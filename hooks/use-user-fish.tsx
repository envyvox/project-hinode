import { useUserFishStore } from "@/store/user-fish-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const useUserFish = () => {
  const userId = useUserStore((state) => state.user).id;
  const getUserFish = useUserFishStore((state) => state.getUserFish);

  useEffect(() => {
    console.log("useUserFish", userId);
    if (userId !== "") {
      getUserFish(userId);
    }
  }, [userId, getUserFish]);
};

export default useUserFish;
