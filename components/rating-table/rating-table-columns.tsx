import { ColumnDef } from "@tanstack/react-table";
import { GameUser } from "@/services/data-access/user";
import React from "react";
import RatingTableCellName from "./rating-table-cell-name";
import RatingTableCellPosition from "./rating-table-cell-position";
import RatingTableCellLevel from "./rating-table-cell-level";

export const ratingTableColumns: ColumnDef<GameUser>[] = [
  {
    accessorKey: "position",
    header: "rating.user.position",
    cell: ({ row }) => <RatingTableCellPosition row={row} />,
  },
  {
    accessorKey: "name",
    header: "rating.user.name",
    cell: ({ row }) => <RatingTableCellName row={row} />,
  },
  {
    accessorKey: "level",
    header: "rating.user.level",
    cell: ({ row }) => <RatingTableCellLevel row={row} />,
  },
  {
    accessorKey: "xp",
    header: "rating.user.xp",
  },
];
