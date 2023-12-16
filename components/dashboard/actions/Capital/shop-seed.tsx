import { useDictionaryStore } from "@/store/dictionary-store";
import DashboardActionBase from "../dashboard-action-base";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { SeedCropIncluded, getSeeds } from "@/services/data-access/seed";
import ShopSeedItem from "./shop-seed-item";
import ShopSeedSkeleton from "./shop-seed-skeleton";
import { useUserSeedStore } from "@/store/user-seed-store";
import { useUserCurrencyStore } from "@/store/user-currency-store";
import { Currency } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import UseUserCurrency from "@/hooks/use-user-currency";
import formatString from "@/util/format-string";
import IenIcon from "@/public/currency/Ien.png";
import Image from "next/image";

const ActionCapitalShopSeed = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const addSeedToUser = useUserSeedStore((state) => state.addSeedToUser);
  const userCurrencies = useUserCurrencyStore((state) => state.userCurrencies);
  const removeCurrencyFromUser = useUserCurrencyStore(
    (state) => state.removeCurrencyFromUser,
  );
  const [seeds, setSeeds] = useState<SeedCropIncluded[]>([]);
  const { toast } = useToast();

  UseUserCurrency();

  useEffect(() => {
    getSeeds().then((seeds) => setSeeds(seeds));
  }, []);

  const handleBuySeed = (seed: SeedCropIncluded) => {
    const userCurrency = userCurrencies.find(
      (currency) => currency.currency === Currency.Ien,
    );

    if (userCurrency === undefined || userCurrency.amount < seed.price) {
      toast({
        description: formatString(
          "У тебя недостаточно {0} иен для приобретения {1} {2}.",
          <Image className="mx-1 inline h-6 w-6" src={IenIcon} alt="Ien" />,
          <Image
            className="mx-1 inline h-6 w-6"
            width={27}
            height={27}
            src={`/seed/${seed.name}.png`}
            alt={seed.name}
          />,
          seed.name,
        ),
      });
      return;
    }

    removeCurrencyFromUser(Currency.Ien, seed.price);
    addSeedToUser(seed.id, 1);

    toast({
      description: formatString(
        "Ты успешно приобрел {0} {1} за {2} {3} иен.",
        <Image
          className="mx-1 inline h-6 w-6"
          width={27}
          height={27}
          src={`/seed/${seed.name}.png`}
          alt={seed.name}
        />,
        seed.name,
        <Image className="mx-1 inline h-6 w-6" src={IenIcon} alt="Ien" />,
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
        <Sheet>
          <SheetTrigger asChild>
            <Button className="mt-2 w-fit self-end" variant="secondary">
              {
                dictionary.dashboard[
                  "dashboard.actions.capital.shop-seed.button-label"
                ]
              }
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-full">
            <div className="container flex flex-col gap-5">
              <SheetHeader>
                <SheetTitle>
                  {
                    dictionary.dashboard[
                      "dashboard.actions.capital.shop-seed.label"
                    ]
                  }
                </SheetTitle>
                <SheetDescription>
                  {
                    dictionary.dashboard[
                      "dashboard.actions.capital.shop-seed.description"
                    ]
                  }
                </SheetDescription>
              </SheetHeader>
              <ScrollArea className="h-[85vh]">
                <div className="grid grid-flow-dense grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {seeds.length ? (
                    seeds.map((seed) => (
                      <ShopSeedItem
                        key={seed.id}
                        dictonary={dictionary}
                        seed={seed}
                        handleBuySeed={handleBuySeed}
                      />
                    ))
                  ) : (
                    <ShopSeedSkeleton />
                  )}
                </div>
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>
      }
    />
  );
};

export default ActionCapitalShopSeed;
