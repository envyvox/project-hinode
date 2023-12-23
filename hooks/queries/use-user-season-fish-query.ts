import { getUserSeasonFish } from "@/services/data-access/fish";
import { useUserStore } from "@/store/user-store";
import { Season } from "@prisma/client";
import { useQuery } from "react-query";
import { useWorldStateQuery } from "./use-world-state-query";

export const useUserSeasonFishQuery = () => {
  const user = useUserStore((state) => state.user);
  const { data: worldState } = useWorldStateQuery();

  return useQuery({
    queryKey: ["user-season-fish", user.id, worldState?.season],
    queryFn: () => getUserSeasonFish(user.id, worldState?.season ?? Season.Any),
  });
};
