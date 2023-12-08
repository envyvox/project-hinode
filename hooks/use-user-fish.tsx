import { useUserFishStore } from "@/store/user-fish-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

export default function UseUserFish() {
  const user = useUserStore((state) => state.user);
  const getUserFish = useUserFishStore((state) => state.getUserFish);

  useEffect(() => {
    if (user.id !== "") {
      getUserFish(user.id);
    }
  }, [user, getUserFish]);
}
