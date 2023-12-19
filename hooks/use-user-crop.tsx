import { useUserCropStore } from "@/store/user-crop-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const useUserCrop = () => {
  const user = useUserStore((state) => state.user);
  const getUserCrops = useUserCropStore((state) => state.getUserCrops);

  useEffect(() => {
    if (user.id !== "") {
      getUserCrops(user.id);
    }
  }, [user, getUserCrops]);
};

export default useUserCrop;
