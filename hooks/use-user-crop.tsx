import { useUserCropStore } from "@/store/user-crop-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const useUserCrop = () => {
  const userId = useUserStore((state) => state.user).id;
  const getUserCrops = useUserCropStore((state) => state.getUserCrops);

  useEffect(() => {
    console.log("useUserCrop", userId);
    if (userId !== "") {
      getUserCrops(userId);
    }
  }, [userId, getUserCrops]);
};

export default useUserCrop;
