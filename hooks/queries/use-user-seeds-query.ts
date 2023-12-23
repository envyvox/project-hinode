import { getUserSeeds } from "@/services/data-access/seed";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

export const useUserSeedsQuery = () => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ["user-seed", user.id],
    queryFn: () => getUserSeeds(user.id),
  });
};
