import Image from "next/image";
import { UserFarmCellSeedIncluded } from "@/services/data-access/farm";
import { useDictionaryStore } from "@/store/dictionary-store";
import { FarmCellState } from "@prisma/client";

import { HexGridContent } from "@/components/ui/hex-grid";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TypographyLarge from "@/components/typography/large";

import FarmDymanicCellContent from "./farm-dynamic-cell-content";

type Props = {
  cell: UserFarmCellSeedIncluded;
};

const FarmCell = ({ cell }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <Popover>
      <PopoverTrigger>
        <HexGridContent className="gap-5">
          <TypographyLarge>
            {dictionary.farmCellState[cell.state]}
          </TypographyLarge>
          {cell.seed ? (
            cell.state === FarmCellState.Completed ? (
              <Image
                className="h-24 w-24"
                width={108}
                height={108}
                src={`/crop/${cell.seed.name.replace("Seeds", "")}.png`}
                alt={cell.seed.name}
              />
            ) : (
              <Image
                className="h-24 w-24"
                width={108}
                height={108}
                src={`/seed/${cell.seed.name}.png`}
                alt={cell.seed.name}
              />
            )
          ) : (
            <Image
              className="h-24 w-24"
              width={108}
              height={108}
              src={`/etc/CellEmpty.png`}
              alt="CellEmpty"
            />
          )}
        </HexGridContent>
      </PopoverTrigger>
      <PopoverContent align="start" className="max-w-[300px]">
        <FarmDymanicCellContent cell={cell} />
      </PopoverContent>
    </Popover>
  );
};

export default FarmCell;
