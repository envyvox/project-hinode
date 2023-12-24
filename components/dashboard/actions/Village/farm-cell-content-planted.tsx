import { UserFarmCellSeedIncluded } from "@/services/data-access/farm";
import { useDictionaryStore } from "@/store/dictionary-store";
import formatString from "@/util/format-string";

import { useWaterCellMutation } from "@/hooks/mutations/use-water-cell-mutation";
import { Button } from "@/components/ui/button";
import TypographyLarge from "@/components/typography/large";
import TypographyMuted from "@/components/typography/muted";
import TypographySmall from "@/components/typography/small";

type Props = {
  cell: UserFarmCellSeedIncluded;
};

const FarmCellContentPlanted = ({ cell }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const growthDays = cell.inReGrowth
    ? cell.seed!.reGrowthDays - cell.progress
    : cell.seed!.growthDays - cell.progress;

  const { mutate: waterCell, isLoading } = useWaterCellMutation();

  return (
    <>
      <TypographyLarge>{cell.seed?.name}</TypographyLarge>
      <TypographyMuted>
        {formatString(
          dictionary.dashboard["actions.village.farm.sheet.planted.label"],
          growthDays
        )}
      </TypographyMuted>
      <div className="mt-5 flex flex-col gap-5">
        <TypographySmall>
          {dictionary.dashboard["actions.village.farm.sheet.planted.desc"]}
        </TypographySmall>
        <Button disabled={isLoading} onClick={() => waterCell(cell.id)}>
          {dictionary.dashboard["actions.village.farm.sheet.planted.button"]}
        </Button>
      </div>
    </>
  );
};

export default FarmCellContentPlanted;
