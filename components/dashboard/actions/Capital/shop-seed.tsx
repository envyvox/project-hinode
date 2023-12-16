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

const ActionCapitalShopSeed = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const [seeds, setSeeds] = useState<SeedCropIncluded[]>([]);

  useEffect(() => {
    getSeeds().then((seeds) => setSeeds(seeds));
  }, []);

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
