"use client";

import { useUsersQuery } from "@/hooks/queries/use-users-query";
import { DataTable } from "@/components/data-table";
import { ratingTableColumns } from "@/components/rating-table/rating-table-columns";

const WorldRating = () => {
  const { data: users, isLoading } = useUsersQuery();

  return (
    <DataTable
      columns={ratingTableColumns}
      data={users ?? []}
      isLoading={isLoading}
    />
  );
};

export default WorldRating;
