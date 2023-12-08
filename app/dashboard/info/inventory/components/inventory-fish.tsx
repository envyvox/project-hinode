"use client";

import { TypographyMuted } from "@/components/typography/muted";
import { TypographySmall } from "@/components/typography/small";
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

export default function InventoryFish() {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const loading = useUserFishStore((state) => state.loading);
  const userFish = useUserFishStore((state) => state.userFish);

  UseUserFish();

  return (
    <>
      <TypographySmall>
        {dictionary.dashboard["info.inventory.fish"]}
      </TypographySmall>
      <div className="flex flex-wrap gap-5">
        {loading ? (
          <>
            <Skeleton className="h-[85px] flex-1" />
            <Skeleton className="h-[85px] flex-1" />
          </>
        ) : userFish.length > 0 ? (
          userFish.map((uFish) => (
            <TooltipProvider key={uFish.fishId}>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex h-[85px] flex-col items-center justify-between gap-1 rounded-lg border p-2">
                    <Image
                      src={`/fish/${uFish.fish.name}.png`}
                      alt={uFish.fish.name}
                      width={36}
                      height={36}
                    />
                    {Number(uFish.amount)}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{uFish.fish.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))
        ) : (
          <div className="flex flex-col justify-center gap-1 rounded-lg border p-2">
            <TypographyMuted>
              {dictionary.dashboard["info.inventory.fish.empty"]}
            </TypographyMuted>
          </div>
        )}
      </div>
    </>
  );
}
