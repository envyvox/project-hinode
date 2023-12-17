"use client";

import { User } from "@prisma/client";
import { DataTable } from "./data-table";
import { ratingTableColumns } from "./rating-table-columns";

type Props = {
  users: User[];
};

const RatingTable = ({ users }: Props) => {
  return (
    <div className="flex flex-col space-y-3">
      <DataTable columns={ratingTableColumns} data={users} />
    </div>
  );
};

export default RatingTable;
