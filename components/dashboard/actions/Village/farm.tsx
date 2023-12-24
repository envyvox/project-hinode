import Image from "next/image";
import { useDictionaryStore } from "@/store/dictionary-store";
import formatString from "@/util/format-string";
import { Currency } from "@prisma/client";

import { cn } from "@/lib/utils";
import { useAddUserFarmCellMutation } from "@/hooks/mutations/use-add-user-farm-cell-mutation";
import { useRemoveUserCurrencyMutation } from "@/hooks/mutations/use-remove-user-currency-mutation";
import { useUserFarmCellsQuery } from "@/hooks/queries/use-user-farm-cells-query";
import { Button } from "@/components/ui/button";
import {
  HexGridContent,
  HexGridItem,
  HexGridList,
} from "@/components/ui/hex-grid";
import FullscreenSheet from "@/components/fullscreen-sheet";
import { Icons } from "@/components/icons";
import TypographyLarge from "@/components/typography/large";

import DashboardActionBase from "../dashboard-action-base";
import FarmCell from "./farm-cell";
import FarmSkeleton from "./farm-skeleton";

const farmCellPrice = 500;

const ActionVillageFarm = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: userFarmCells, isLoading } = useUserFarmCellsQuery();
  const { mutate: removeUserCurrency } = useRemoveUserCurrencyMutation();
  const { mutate: addUserFarmCell, isLoading: isAddFarmCellLoading } =
    useAddUserFarmCellMutation();

  const handleBuyFarmCell = () => {
    removeUserCurrency({ currency: Currency.Ien, amount: farmCellPrice });
    addUserFarmCell();
  };

  return (
    <DashboardActionBase
      label={dictionary.dashboard["actions.village.farm.label"]}
      description={dictionary.dashboard["actions.village.farm.description"]}
      actionComponent={
        <FullscreenSheet
          trigger={
            <Button
              className="mt-2 w-fit self-end"
              variant="secondary"
              onClick={() => {}}
            >
              {dictionary.dashboard["actions.village.farm.button-label"]}
            </Button>
          }
          title={dictionary.dashboard["actions.village.farm.label"]}
          description={dictionary.dashboard["actions.village.farm.description"]}
          content={
            isLoading ? (
              <FarmSkeleton />
            ) : (
              <HexGridList>
                <HexGridItem>
                  <button
                    disabled={isAddFarmCellLoading}
                    type="button"
                    aria-haspopup="dialog"
                    onClick={handleBuyFarmCell}
                  >
                    <HexGridContent
                      className={cn(
                        "gap-5",
                        isAddFarmCellLoading && "animate-pulse bg-muted"
                      )}
                    >
                      <TypographyLarge>
                        {formatString(
                          dictionary.dashboard[
                            "actions.village.farm.sheet.buy-cell"
                          ],
                          farmCellPrice,
                          <Icons.Ien />
                        )}
                      </TypographyLarge>
                      <Image
                        className="h-24 w-24"
                        width={108}
                        height={108}
                        src={`/etc/CellExpansion.png`}
                        alt="CellExpansion"
                      />
                    </HexGridContent>
                  </button>
                </HexGridItem>
                {userFarmCells?.map((farmCell) => (
                  <HexGridItem key={farmCell.id}>
                    <FarmCell cell={farmCell} />
                  </HexGridItem>
                ))}
              </HexGridList>
            )
          }
        />
      }
    />
  );
};

export default ActionVillageFarm;
