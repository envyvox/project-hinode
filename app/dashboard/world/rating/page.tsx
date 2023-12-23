"use client";

import { DataTable } from "@/components/data-table";
import { ratingTableColumns } from "@/components/rating-table/rating-table-columns";
import { useUsersQuery } from "@/hooks/queries/use-users-query";

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
