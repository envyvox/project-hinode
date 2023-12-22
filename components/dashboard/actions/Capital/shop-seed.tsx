import { useDictionaryStore } from "@/store/dictionary-store";
import DashboardActionBase from "../dashboard-action-base";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { SeedCropIncluded, getSeeds } from "@/services/data-access/seed";
import ShopSeedItem from "./shop-seed-item";
import ShopSeedSkeleton from "./shop-seed-skeleton";
import { useUserSeedStore } from "@/store/user-seed-store";
import { useUserCurrencyStore } from "@/store/user-currency-store";
import { Currency } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import formatString from "@/util/format-string";
import { IconIen } from "@/components/icons";
import Image from "next/image";
import FullscreenSheet from "@/components/fullscreen-sheet";
import useWorldState from "@/hooks/use-world-state";
import useUserCurrency from "@/hooks/use-user-currency";

const ActionCapitalShopSeed = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const addSeedToUser = useUserSeedStore((state) => state.addSeedToUser);
  const userCurrencies = useUserCurrencyStore((state) => state.userCurrencies);
  const removeCurrencyFromUser = useUserCurrencyStore(
    (state) => state.removeCurrencyFromUser,
  );
  const worldState = useWorldState();
  const [seeds, setSeeds] = useState<SeedCropIncluded[]>([]);
  const { toast } = useToast();

  useUserCurrency();

  useEffect(() => {
    const loadData = async () => {
      const seeds = await getSeeds(worldState.season);
      setSeeds(seeds);
    };
    loadData();
  }, [worldState]);

  const handleBuySeed = (seed: SeedCropIncluded) => {
    const userCurrency = userCurrencies.find(
      (currency) => currency.currency === Currency.Ien,
    );

    if (userCurrency === undefined || userCurrency.amount < seed.price) {
      toast({
        description: formatString(
          dictionary.dashboard[
            "dashboard.actions.capital.shop-seed.sheet.toast.no-currency"
          ],
          <IconIen />,
          <Image
            className="mx-1 inline h-6 w-6"
            width={27}
            height={27}
            src={`/seed/${seed.name}.png`}
            alt={seed.name}
          />,
          // @ts-ignore Implicit any
          dictionary.item.seed[seed.name],
        ),
      });
      return;
    }

    removeCurrencyFromUser(Currency.Ien, seed.price);
    addSeedToUser(seed.id, 1);

    toast({
      description: formatString(
        dictionary.dashboard[
          "dashboard.actions.capital.shop-seed.sheet.toast.success"
        ],
        <Image
          className="mx-1 inline h-6 w-6"
          width={27}
          height={27}
          src={`/seed/${seed.name}.png`}
          alt={seed.name}
        />,
        // @ts-ignore Implicit any,
        dictionary.item.seed[seed.name],
        <IconIen />,
        seed.price,
      ),
    });
  };

  return (
    <DashboardActionBase
      label={dictionary.dashboard["dashboard.actions.capital.shop-seed.label"]}
      description={
        dictionary.dashboard["dashboard.actions.capital.shop-seed.description"]
      }
      actionComponent={
        <FullscreenSheet
          trigger={
            <Button className="mt-2 w-fit self-end" variant="secondary">
              {
                dictionary.dashboard[
                  "dashboard.actions.capital.shop-seed.button-label"
                ]
              }
            </Button>
          }
          title={
            dictionary.dashboard["dashboard.actions.capital.shop-seed.label"]
          }
          description={
            dictionary.dashboard[
              "dashboard.actions.capital.shop-seed.description"
            ]
          }
          content={
            <div className="grid grid-flow-dense grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {seeds.length ? (
                seeds.map((seed) => (
                  <ShopSeedItem
                    key={seed.id}
                    seed={seed}
                    handleBuySeed={handleBuySeed}
                  />
                ))
              ) : (
                <ShopSeedSkeleton />
              )}
            </div>
          }
        />
      }
    />
  );
};

export default ActionCapitalShopSeed;
