import { getWorkContracts } from "@/services/data-access/work-contract";
import { Location } from "@prisma/client";
import { useQuery } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useWorkContractsQuery = (location: Location) => {
  return useQuery({
    queryKey: ReactQueryKeys.workContracts(location),
    queryFn: () => getWorkContracts(location),
  });
};
