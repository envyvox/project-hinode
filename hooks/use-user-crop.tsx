import { useUserCropStore } from "@/store/user-crop-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

export default function UseUserCrop() {
  const user = useUserStore((state) => state.user);
  const getUserCrops = useUserCropStore((state) => state.getUserCrops);

  useEffect(() => {
    if (user.id !== "") {
      getUserCrops(user.id);
    }
  }, [user, getUserCrops]);
}
