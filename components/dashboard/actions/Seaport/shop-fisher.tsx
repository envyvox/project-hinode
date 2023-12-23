import { useDictionaryStore } from "@/store/dictionary-store";
import DashboardActionBase from "../dashboard-action-base";
import { Button } from "@/components/ui/button";
import ShopFisherUserFish from "./shop-fisher-user-fish";
import ShopFisherSkeleton from "./shop-fisher-skeleton";
import FullscreenSheet from "@/components/fullscreen-sheet";
import TypographyMuted from "@/components/typography/muted";
import { useUserSeasonFishQuery } from "@/hooks/queries/use-user-season-fish-query";

const ActionSeaportShopFisher = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: userFish, isLoading } = useUserSeasonFishQuery();

  return (
    <DashboardActionBase
      label={
        dictionary.dashboard["dashboard.actions.seaport.shop-fisher.label"]
      }
      description={
        dictionary.dashboard[
          "dashboard.actions.seaport.shop-fisher.description"
        ]
      }
      actionComponent={
        <FullscreenSheet
          trigger={
            <Button className="mt-2 w-fit self-end" variant="secondary">
              {
                dictionary.dashboard[
                  "dashboard.actions.seaport.shop-fisher.button-label"
                ]
              }
            </Button>
          }
          title={
            dictionary.dashboard["dashboard.actions.seaport.shop-fisher.label"]
          }
          description={
            dictionary.dashboard[
              "dashboard.actions.seaport.shop-fisher.description"
            ]
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
                      "dashboard.actions.seaport.shop-fisher.sheet.no-fish"
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
