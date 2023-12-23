import { getWorldState } from "@/services/data-access/world-state";
import { useQuery } from "react-query";

export const useWorldStateQuery = () => {
  return useQuery({
    queryKey: ["world-state"],
    queryFn: () => getWorldState(),
  });
};
