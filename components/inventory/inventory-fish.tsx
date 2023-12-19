"use client";

import TypographyMuted from "@/components/typography/muted";
import TypographySmall from "@/components/typography/small";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UseUserFish from "@/hooks/use-user-fish";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserFishStore } from "@/store/user-fish-store";
import Image from "next/image";
import InventorySkeleton from "./inventory-skeleton";
import { cn } from "@/lib/utils";
import { getRarityBorderColor } from "@/util/get-rarity-border-color";

const InventoryFish = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const loading = useUserFishStore((state) => state.loading);
  const userFish = useUserFishStore((state) => state.userFish);

  UseUserFish();

  return (
    <>
      <TypographySmall>
        {dictionary.dashboard["user.inventory.fish"]}
      </TypographySmall>
      <div className="flex flex-wrap gap-5">
        {loading ? (
          <InventorySkeleton />
        ) : userFish.length ? (
          userFish.map((uf) => (
            <TooltipProvider key={uf.fishId}>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={cn(
                      "flex h-[85px] flex-col items-center justify-between gap-1 rounded-lg border bg-card p-2 text-card-foreground shadow-sm",
                      getRarityBorderColor(uf.fish.rarity),
                    )}
                  >
                    <Image
                      className="h-8 w-8 object-contain"
                      src={`/fish/${uf.fish.name}.png`}
                      alt={uf.fish.name}
                      width={36}
                      height={36}
                    />
                    {Number(uf.amount)}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{uf.fish.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))
        ) : (
          <div className="flex flex-col justify-center gap-1 rounded-lg border p-2">
            <TypographyMuted>
              {dictionary.dashboard["user.inventory.fish.empty"]}
            </TypographyMuted>
          </div>
        )}
      </div>
    </>
  );
};

export default InventoryFish;
