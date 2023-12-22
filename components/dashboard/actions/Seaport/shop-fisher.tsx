import { useDictionaryStore } from "@/store/dictionary-store";
import DashboardActionBase from "../dashboard-action-base";
import { Button } from "@/components/ui/button";
import { useUserFishStore } from "@/store/user-fish-store";
import { Season } from "@prisma/client";
import ShopFisherUserFish from "./shop-fisher-user-fish";
import ShopFisherSkeleton from "./shop-fisher-skeleton";
import FullscreenSheet from "@/components/fullscreen-sheet";
import TypographyMuted from "@/components/typography/muted";
import useWorldState from "@/hooks/use-world-state";
import useUserFish from "@/hooks/use-user-fish";
import { useMemo } from "react";

const ActionSeaportShopFisher = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const loading = useUserFishStore((state) => state.loading);
  const userFish = useUserFishStore((state) => state.userFish);
  const worldState = useWorldState();

  const filteredUserFish = useMemo(() => {
    return userFish.filter(
      (uf) =>
        uf.fish.catchSeason.includes(worldState.season) ||
        uf.fish.catchSeason.includes(Season.Any),
    );
  }, [userFish, worldState.season]);

  useUserFish();

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
              {loading ? (
                <ShopFisherSkeleton />
              ) : userFish.length ? (
                filteredUserFish.map((uf) => (
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
