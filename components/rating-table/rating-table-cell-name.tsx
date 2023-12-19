import Image from "next/image";
import TypographyMuted from "../typography/muted";
import { Row } from "@tanstack/react-table";
import { GameUser } from "@/services/data-access/user";
import { useDictionaryStore } from "@/store/dictionary-store";

type Props = {
  row: Row<GameUser>;
};

const RatingTableCellName = ({ row }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  return (
    <div className="flex items-center gap-2">
      <Image
        className="h-6 w-6"
        width={27}
        height={27}
        src={`/title/${row.original.title}.png`}
        alt={row.original.title}
      />
      <TypographyMuted>{dictionary.title[row.original.title]}</TypographyMuted>
      <span>{row.original.name}</span>
    </div>
  );
};

export default RatingTableCellName;
