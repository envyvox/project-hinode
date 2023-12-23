import { getUserBoxes } from "@/services/data-access/box";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

export const useUserBoxesQuery = () => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ["user-box", user.id],
    queryFn: () => getUserBoxes(user.id),
  });
};
