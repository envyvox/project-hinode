import { useDictionaryStore } from "@/store/dictionary-store";

import { useUserSeasonFishQuery } from "@/hooks/queries/use-user-season-fish-query";
import { Button } from "@/components/ui/button";
import FullscreenSheet from "@/components/fullscreen-sheet";
import TypographyMuted from "@/components/typography/muted";

import DashboardActionBase from "../dashboard-action-base";
import ShopFisherSkeleton from "./shop-fisher-skeleton";
import ShopFisherUserFish from "./shop-fisher-user-fish";

const ActionSeaportShopFisher = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: userFish, isLoading } = useUserSeasonFishQuery();

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
              ) : userFish?.length ? (
                userFish.map((uf) => (
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
