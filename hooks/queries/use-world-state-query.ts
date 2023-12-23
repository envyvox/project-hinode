import { ReactQueryKeys } from "@/lib/react-query-keys";
import { getWorldState } from "@/services/data-access/world-state";
import { useQuery } from "react-query";

export const useWorldStateQuery = () => {
  return useQuery({
    queryKey: ReactQueryKeys.worldState,
    queryFn: () => getWorldState(),
  });
};
