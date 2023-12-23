import { getSeeds } from "@/services/data-access/seed";
import { Season } from "@prisma/client";
import { useQuery } from "react-query";
import { useWorldStateQuery } from "../queries/use-world-state-query";

export const useSeedsQuery = () => {
  const { data: worldState } = useWorldStateQuery();

  return useQuery({
    queryKey: ["seeds", worldState?.season],
    queryFn: () => getSeeds(worldState?.season ?? Season.Any),
  });
};
