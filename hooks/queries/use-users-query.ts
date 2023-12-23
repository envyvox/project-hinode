import { getUsers } from "@/services/data-access/user";
import { useQuery } from "react-query";

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
};
