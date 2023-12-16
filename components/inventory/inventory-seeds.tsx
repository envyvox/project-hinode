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
import UseUserSeed from "@/hooks/use-user-seed";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserSeedStore } from "@/store/user-seed-store";
import Image from "next/image";
import InventorySkeleton from "./inventory-skeleton";

const InventorySeeds = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const loading = useUserSeedStore((state) => state.loading);
  const userSeeds = useUserSeedStore((state) => state.userSeeds);

  UseUserSeed();

  return (
    <>
      <TypographySmall>
        {dictionary.dashboard["user.inventory.seed"]}
      </TypographySmall>
      <div className="flex flex-wrap gap-5">
        {loading ? (
          <InventorySkeleton />
        ) : userSeeds.length ? (
          userSeeds.map((userSeed) => (
            <TooltipProvider key={userSeed.seedId}>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex h-[85px] flex-col items-center justify-between gap-1 rounded-lg border bg-card p-2 text-card-foreground shadow-sm">
                    <Image
                      src={`/seed/${userSeed.seed.name}.png`}
                      alt={userSeed.seed.name}
                      width={36}
                      height={36}
                    />
                    {Number(userSeed.amount)}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{userSeed.seed.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))
        ) : (
          <div className="flex flex-col justify-center gap-1 rounded-lg border p-2">
            <TypographyMuted>
              {dictionary.dashboard["user.inventory.seed.empty"]}
            </TypographyMuted>
          </div>
        )}
      </div>
    </>
  );
};

export default InventorySeeds;
