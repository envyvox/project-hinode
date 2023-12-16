import { useUserBoxStore } from "@/store/user-box-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const UseUserBox = () => {
  const user = useUserStore((state) => state.user);
  const getUserBoxes = useUserBoxStore((state) => state.getUserBoxes);

  useEffect(() => {
    if (user.id !== "") {
      getUserBoxes(user.id);
    }
  }, [user, getUserBoxes]);
};

export default UseUserBox;
