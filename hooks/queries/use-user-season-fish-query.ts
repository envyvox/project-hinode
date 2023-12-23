import { getUserSeasonFish } from "@/services/data-access/fish";
import { useUserStore } from "@/store/user-store";
import { Season } from "@prisma/client";
import { useQuery } from "react-query";
import { useWorldStateQuery } from "./use-world-state-query";
import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useUserSeasonFishQuery = () => {
  const user = useUserStore((state) => state.user);
  const { data: worldState } = useWorldStateQuery();

  return useQuery({
    queryKey: ReactQueryKeys.userSeasonFish(
      user.id,
      worldState?.season ?? Season.Any,
    ),
    queryFn: () => getUserSeasonFish(user.id, worldState?.season ?? Season.Any),
  });
};
