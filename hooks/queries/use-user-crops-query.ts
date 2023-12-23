import { getUserCrops } from "@/services/data-access/crop";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

export const useUserCropsQuery = () => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ["user-crop", user.id],
    queryFn: () => getUserCrops(user.id),
  });
};
