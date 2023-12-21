"use client";

import RatingTable from "@/components/rating-table/rating-table";
import { GameUser, getUsers } from "@/services/data-access/user";
import { useEffect, useState } from "react";

const WorldRating = () => {
  const [users, setUsers] = useState<GameUser[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    loadData();
  }, []);

  return <RatingTable users={users} />;
};

export default WorldRating;
