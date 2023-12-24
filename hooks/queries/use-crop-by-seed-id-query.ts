import { getCropBySeedId } from "@/services/data-access/crop";
import { useQuery } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useCropBySeedIdQuery = (seedId: string) => {
  return useQuery({
    queryKey: ReactQueryKeys.cropWithSeedId(seedId),
    queryFn: () => getCropBySeedId(seedId),
  });
};
