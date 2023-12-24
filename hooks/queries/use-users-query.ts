import { getUsers } from "@/services/data-access/user";
import { useQuery } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ReactQueryKeys.users,
    queryFn: () => getUsers(),
  });
};
