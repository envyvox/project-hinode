import { getTransitsFromLocation } from "@/services/data-access/transit";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "react-query";

export const useTransitsQuery = () => {
  const userLocation = useUserStore((state) => state.user.location);

  return useQuery({
    queryKey: ["transits", userLocation],
    queryFn: () => getTransitsFromLocation(userLocation),
  });
};
