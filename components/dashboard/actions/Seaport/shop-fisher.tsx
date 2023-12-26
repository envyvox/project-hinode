import { UserFishIncluded } from "@/services/data-access/fish";
import { useDictionaryStore } from "@/store/dictionary-store";
import { Season } from "@prisma/client";

import { useUserFishQuery } from "@/hooks/queries/use-user-fish-query";
import { useWorldStateQuery } from "@/hooks/queries/use-world-state-query";
import { Button } from "@/components/ui/button";
import FullscreenSheet from "@/components/fullscreen-sheet";
import TypographyMuted from "@/components/typography/muted";

import DashboardActionBase from "../dashboard-action-base";
import ShopFisherSkeleton from "./shop-fisher-skeleton";
import ShopFisherUserFish from "./shop-fisher-user-fish";

const ActionSeaportShopFisher = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: userFish, isLoading } = useUserFishQuery();
  const { data: worldState } = useWorldStateQuery();

  let filteredUserFish: UserFishIncluded[] = [];
  if (!isLoading && userFish?.length) {
    filteredUserFish = userFish.filter(
      (uf) =>
        uf.fish.catchSeason.includes(worldState?.season ?? Season.Any) ||
        uf.fish.catchSeason.includes(Season.Any)
    );
  }

  return (
    <DashboardActionBase
      label={dictionary.dashboard["actions.seaport.shop-fisher.label"]}
      description={
        dictionary.dashboard["actions.seaport.shop-fisher.description"]
      }
      actionComponent={
        <FullscreenSheet
          trigger={
            <Button className="mt-2 w-fit self-end" variant="secondary">
              {dictionary.dashboard["actions.seaport.shop-fisher.button-label"]}
            </Button>
          }
          title={dictionary.dashboard["actions.seaport.shop-fisher.label"]}
          description={
            dictionary.dashboard["actions.seaport.shop-fisher.description"]
          }
          content={
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {isLoading ? (
                <ShopFisherSkeleton />
              ) : filteredUserFish.length ? (
                filteredUserFish.map((uf) => (
                  <ShopFisherUserFish key={uf.fishId} userFish={uf} />
                ))
              ) : (
                <TypographyMuted>
                  {
                    dictionary.dashboard[
                      "actions.seaport.shop-fisher.sheet.no-fish"
                    ]
                  }
                </TypographyMuted>
              )}
            </div>
          }
        />
      }
    />
  );
};

export default ActionSeaportShopFisher;
