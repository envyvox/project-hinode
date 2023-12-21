import { useUserCropStore } from "@/store/user-crop-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

const useUserCrop = () => {
  const userId = useUserStore((state) => state.user).id;
  const userCrops = useUserCropStore((state) => state.userCrops);
  const getUserCrops = useUserCropStore((state) => state.getUserCrops);

  useEffect(() => {
    const loadData = async () => {
      if (userId !== "" && userCrops.length === 0) {
        await getUserCrops(userId);
      }
    };
    loadData();
  }, [userId, userCrops, getUserCrops]);
};

export default useUserCrop;
