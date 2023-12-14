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
import UseUserGathering from "@/hooks/use-user-gathering";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserGatheringStore } from "@/store/user-gathering-store";
import Image from "next/image";

export default function InventoryGathering() {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const loading = useUserGatheringStore((state) => state.loading);
  const userGatherings = useUserGatheringStore((state) => state.userGatherings);

  UseUserGathering();

  return (
    <>
      <TypographySmall>
        {dictionary.dashboard["user.inventory.gathering"]}
      </TypographySmall>
      <div className="flex flex-wrap gap-5">
        {loading ? (
          <>
            <Skeleton className="h-[85px] flex-1" />
            <Skeleton className="h-[85px] flex-1" />
          </>
        ) : userGatherings.length > 0 ? (
          userGatherings.map((userGathering) => (
            <TooltipProvider key={userGathering.gatheringId}>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex h-[85px] flex-col items-center justify-between gap-1 rounded-lg border bg-card p-2 text-card-foreground shadow-sm">
                    <Image
                      src={`/gathering/${userGathering.gathering.name}.png`}
                      alt={userGathering.gathering.name}
                      width={36}
                      height={36}
                    />
                    {Number(userGathering.amount)}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{userGathering.gathering.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))
        ) : (
          <div className="flex flex-col justify-center gap-1 rounded-lg border p-2">
            <TypographyMuted>
              {dictionary.dashboard["user.inventory.gathering.empty"]}
            </TypographyMuted>
          </div>
        )}
      </div>
    </>
  );
}
