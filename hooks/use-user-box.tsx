import { useUserBoxStore } from "@/store/user-box-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const useUserBox = () => {
  const userId = useUserStore((state) => state.user).id;
  const getUserBoxes = useUserBoxStore((state) => state.getUserBoxes);

  useEffect(() => {
    console.log("useUserBox", userId);
    if (userId !== "") {
      getUserBoxes(userId);
    }
  }, [userId, getUserBoxes]);
};

export default useUserBox;
