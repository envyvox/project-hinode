import { GameUser } from "@/services/data-access/user";
import displayLevel from "@/util/display-level";
import { Row } from "@tanstack/react-table";

type Props = {
  row: Row<GameUser>;
};

const RatingTableCellLevel = ({ row }: Props) => {
  return (
    <div className="flex items-center gap-2">
      {displayLevel(row.original.level)}
      {row.original.level}
    </div>
  );
};

export default RatingTableCellLevel;
