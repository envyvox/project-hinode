import { ReactQueryKeys } from "@/lib/react-query-keys";
import { getUserFish } from "@/services/data-access/fish";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

export const useUserFishQuery = () => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ReactQueryKeys.userFish(user.id),
    queryFn: () => getUserFish(user.id),
  });
};
