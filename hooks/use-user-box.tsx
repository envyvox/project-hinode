import { useUserBoxStore } from "@/store/user-box-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const useUserBox = () => {
  const userId = useUserStore((state) => state.user).id;
  const userBoxes = useUserBoxStore((state) => state.userBoxes);
  const getUserBoxes = useUserBoxStore((state) => state.getUserBoxes);

  useEffect(() => {
    const loadData = async () => {
      if (userId !== "" && userBoxes.length === 0) {
        await getUserBoxes(userId);
      }
    };
    loadData();
  }, [userId, userBoxes, getUserBoxes]);
};

export default useUserBox;
