import { UserFarmCellSeedIncluded } from "@/services/data-access/farm";
import { useDictionaryStore } from "@/store/dictionary-store";
import formatString from "@/util/format-string";

import TypographyLarge from "@/components/typography/large";
import TypographyMuted from "@/components/typography/muted";
import TypographySmall from "@/components/typography/small";

type Props = {
  cell: UserFarmCellSeedIncluded;
};

const FarmCellContentWatered = ({ cell }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const growthDays = cell.inReGrowth
    ? cell.seed!.reGrowthDays - cell.progress
    : cell.seed!.growthDays - cell.progress;

  return (
    <>
      <TypographyLarge>{cell.seed?.name}</TypographyLarge>
      <TypographyMuted>
        {formatString(
          dictionary.dashboard["actions.village.farm.sheet.watered.label"],
          growthDays
        )}
      </TypographyMuted>
      <div className="mt-5 flex flex-col gap-5">
        <TypographySmall>
          {dictionary.dashboard["actions.village.farm.sheet.watered.desc"]}
        </TypographySmall>
      </div>
    </>
  );
};

export default FarmCellContentWatered;
