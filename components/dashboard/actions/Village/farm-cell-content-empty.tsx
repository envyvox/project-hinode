import { useState } from "react";
import { UserFarmCellSeedIncluded } from "@/services/data-access/farm";
import { useDictionaryStore } from "@/store/dictionary-store";
import { Seed } from "@prisma/client";

import { usePlantSeedToCellMutation } from "@/hooks/mutations/use-plant-seed-to-farm-cell-mutation";
import { useRemoveUserSeedMutation } from "@/hooks/mutations/use-remove-user-seed-mutation";
import { Button } from "@/components/ui/button";
import TypographyLarge from "@/components/typography/large";
import TypographyMuted from "@/components/typography/muted";

import SeedsSelect from "../../../seeds-select";

type Props = {
  cell: UserFarmCellSeedIncluded;
};

const FarmCellContentEmpty = ({ cell }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { mutate: plantSeedToCell } = usePlantSeedToCellMutation();
  const { mutate: removeUserSeed } = useRemoveUserSeedMutation();
  const [selectedSeed, setSelectedSeed] = useState<Seed>();

  const handlePlantSeed = (cellId: string) => {
    setSelectedSeed(undefined);
    removeUserSeed({ seedId: selectedSeed?.id as string, amount: 1 });
    plantSeedToCell({ cellId: cellId, seedId: selectedSeed?.id as string });
  };

  return (
    <>
      <TypographyLarge>
        {dictionary.dashboard["actions.village.farm.sheet.empty.label"]}
      </TypographyLarge>
      <TypographyMuted>
        {dictionary.dashboard["actions.village.farm.sheet.empty.desc"]}
      </TypographyMuted>
      <div className="mt-5 flex flex-col gap-5">
        <SeedsSelect
          selectedSeed={selectedSeed}
          setSelectedSeed={setSelectedSeed}
        />
        <Button
          disabled={!selectedSeed}
          onClick={() => handlePlantSeed(cell.id)}
        >
          {dictionary.dashboard["actions.village.farm.sheet.empty.button"]}
        </Button>
      </div>
    </>
  );
};

export default FarmCellContentEmpty;
