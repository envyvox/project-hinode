import { getUsers } from "@/data-access/user";
import RatingTable from "./rating-table";

export default async function WorldRating() {
  const users = await getUsers();

  return <RatingTable users={users} />;
}
