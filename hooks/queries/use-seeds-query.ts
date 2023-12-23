import { getSeeds } from "@/services/data-access/seed";
import { Season } from "@prisma/client";
import { useQuery } from "react-query";
import { useWorldStateQuery } from "../queries/use-world-state-query";
import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useSeedsQuery = () => {
  const { data: worldState } = useWorldStateQuery();

  return useQuery({
    queryKey: ReactQueryKeys.seeds(worldState?.season ?? Season.Any),
    queryFn: () => getSeeds(worldState?.season ?? Season.Any),
  });
};
