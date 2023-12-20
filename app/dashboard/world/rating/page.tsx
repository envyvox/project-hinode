"use client";

import RatingTable from "@/components/rating-table/rating-table";
import { GameUser, getUsers } from "@/services/data-access/user";
import { useEffect, useState } from "react";

const WorldRating = () => {
  const [users, setUsers] = useState<GameUser[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return <RatingTable users={users} />;
};

export default WorldRating;
