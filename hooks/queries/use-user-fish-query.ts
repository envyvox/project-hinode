import { getUserFish } from "@/services/data-access/fish";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

export const useUserFishQuery = () => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ["user-fish", user.id],
    queryFn: () => getUserFish(user.id),
  });
};
