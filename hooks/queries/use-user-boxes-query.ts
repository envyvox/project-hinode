import { getUserBoxes } from "@/services/data-access/box";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

import { ReactQueryKeys } from "@/lib/react-query-keys";

export const useUserBoxesQuery = () => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ReactQueryKeys.userBoxes(user.id),
    queryFn: () => getUserBoxes(user.id),
  });
};
