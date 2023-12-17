"use client";

import { DataTable } from "./data-table";
import { ratingTableColumns } from "./rating-table-columns";
import { GameUser } from "@/services/data-access/user";

type Props = {
  users: GameUser[];
};

const RatingTable = ({ users }: Props) => {
  return (
    <div className="flex flex-col space-y-3">
      <DataTable columns={ratingTableColumns} data={users} />
    </div>
  );
};

export default RatingTable;
