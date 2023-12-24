import { GameUser } from "@/services/data-access/user";
import { ColumnDef } from "@tanstack/react-table";

import UserHoverCard from "../user-hover-card";
import RatingTableCellLevel from "./rating-table-cell-level";
import RatingTableCellPosition from "./rating-table-cell-position";

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
