import displayPosition from "@/util/display-position";
import { ColumnDef } from "@tanstack/react-table";
import TypographyMuted from "./typography/muted";
import Image from "next/image";
import displayLevel from "@/util/display-level";
import { GameUser } from "@/services/data-access/user";

export const ratingTableColumns: ColumnDef<GameUser>[] = [
  {
    accessorKey: "position",
    header: "rating.user.position",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-center">
        {displayPosition(row.index + 1)}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "rating.user.name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image
          className="h-6 w-6"
          width={27}
          height={27}
          src={`/title/${row.original.title}.png`}
          alt={row.original.title}
        />
        <TypographyMuted>{row.original.title}</TypographyMuted>
        <span>{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "level",
    header: "rating.user.level",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {displayLevel(row.original.level)}
        {row.original.level}
      </div>
    ),
  },
  {
    accessorKey: "xp",
    header: "rating.user.xp",
  },
];
