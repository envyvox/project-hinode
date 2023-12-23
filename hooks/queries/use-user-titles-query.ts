import { getUserTitles } from "@/services/data-access/title";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

export const useUserTitlesQuery = () => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ["user-titles", user.id],
    queryFn: () => getUserTitles(user.id),
  });
};
