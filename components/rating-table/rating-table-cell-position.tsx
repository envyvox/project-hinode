import { GameUser } from "@/services/data-access/user";
import displayPosition from "@/util/display-position";
import { Row } from "@tanstack/react-table";

type Props = {
  row: Row<GameUser>;
};

const RatingTableCellPosition = ({ row }: Props) => {
  return (
    <div className="flex items-center gap-2 text-center">
      {displayPosition(row.index + 1)}
    </div>
  );
};

export default RatingTableCellPosition;
