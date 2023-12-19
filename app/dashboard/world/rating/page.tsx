import RatingTable from "@/components/rating-table/rating-table";
import { getUsers } from "@/services/data-access/user";

const WorldRating = async () => {
  const users = await getUsers();

  return <RatingTable users={users} />;
};

export default WorldRating;
