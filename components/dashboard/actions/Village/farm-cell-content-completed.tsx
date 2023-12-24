import { useState } from "react";
import Image from "next/image";
import { UserFarmCellSeedIncluded } from "@/services/data-access/farm";
import { useDictionaryStore } from "@/store/dictionary-store";
import formatString from "@/util/format-string";
import getRandomNumberBetween from "@/util/get-random-number";

import { useAddUserCropMutation } from "@/hooks/mutations/use-add-user-crop-mutation";
import { useReGrowthCellMutation } from "@/hooks/mutations/use-re-growth-cell-mutation";
import { useResetCellMutation } from "@/hooks/mutations/use-reset-cell-mutation";
import { useCropBySeedIdQuery } from "@/hooks/queries/use-crop-by-seed-id-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import TypographyLarge from "@/components/typography/large";
import TypographyMuted from "@/components/typography/muted";
import TypographySmall from "@/components/typography/small";

type Props = {
  cell: UserFarmCellSeedIncluded;
};

const FarmCellContentCompleted = ({ cell }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: crop, isLoading: isCropLoading } = useCropBySeedIdQuery(
    cell.seedId!
  );
  const { mutate: reGrowthCell, isLoading: isReGrowthLoading } =
    useReGrowthCellMutation();
  const { mutate: resetCell, isLoading: isResetLoading } =
    useResetCellMutation();
  const { mutate: addCropToUser } = useAddUserCropMutation();
  const { toast } = useToast();

  // There are some delay before updated cell will be available
  // so user can click again and collect crop second time
  // therefore we need to check if cell is collected
  const [isCollected, setCollected] = useState(false);

  const handleHarvestCell = () => {
    const amount = cell.seed?.isMultiply ? getRandomNumberBetween(2, 4) : 1;

    addCropToUser({
      cropId: crop!.id,
      amount: amount,
    });

    if (cell.seed?.reGrowthDays) {
      reGrowthCell(cell.id);
    } else {
      resetCell(cell.id);
    }

    toast({
      description: formatString(
        dictionary.dashboard["actions.village.farm.sheet.completed.toast"],
        amount,
        <Image
          className="mx-1 inline h-6 w-6"
          width={27}
          height={27}
          src={`/crop/${crop!.name}.png`}
          alt={crop!.name}
        />,
        // @ts-ignore Implicit any
        dictionary.item.crop[crop!.name]
      ),
    });
    setCollected(true);
  };

  return (
    <>
      <TypographyLarge>{cell.seed?.name}</TypographyLarge>
      <TypographyMuted>
        {dictionary.dashboard["actions.village.farm.sheet.completed.label"]}
      </TypographyMuted>
      <div className="mt-5 flex flex-col gap-5">
        <TypographySmall>
          {cell.seed?.reGrowthDays
            ? formatString(
                dictionary.dashboard[
                  "actions.village.farm.sheet.completed.desc.re-growth"
                ],
                cell.seed?.reGrowthDays
              )
            : dictionary.dashboard["actions.village.farm.sheet.completed.desc"]}
        </TypographySmall>
        <Button
          variant="secondary"
          disabled={
            isReGrowthLoading || isResetLoading || isCropLoading || isCollected
          }
          onClick={handleHarvestCell}
        >
          {dictionary.dashboard["actions.village.farm.sheet.completed.button"]}
        </Button>
      </div>
    </>
  );
};

export default FarmCellContentCompleted;
