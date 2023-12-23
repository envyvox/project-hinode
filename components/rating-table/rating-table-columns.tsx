import { ColumnDef } from "@tanstack/react-table";
import { GameUser } from "@/services/data-access/user";
import React from "react";
import RatingTableCellPosition from "./rating-table-cell-position";
import RatingTableCellLevel from "./rating-table-cell-level";
import UserHoverCard from "../user-hover-card";

export const ratingTableColumns: ColumnDef<GameUser>[] = [
  {
    accessorKey: "position",
    header: "rating.user.position",
    cell: ({ row }) => <RatingTableCellPosition row={row} />,
  },
  {
    accessorKey: "name",
    header: "rating.user.name",
    cell: ({ row }) => <UserHoverCard user={row.original} />,
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
