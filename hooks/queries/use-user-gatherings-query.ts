import { getUserGatherings } from "@/services/data-access/gathering";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

export const useUserGatheringsQuery = () => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ["user-gathering", user.id],
    queryFn: () => getUserGatherings(user.id),
  });
};
