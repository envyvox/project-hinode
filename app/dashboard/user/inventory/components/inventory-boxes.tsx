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
import UseUserBox from "@/hooks/use-user-box";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserBoxStore } from "@/store/user-box-store";
import Image from "next/image";

export default function InventoryBoxes() {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const loading = useUserBoxStore((state) => state.loading);
  const userBoxes = useUserBoxStore((state) => state.userBoxes);

  UseUserBox();

  return (
    <>
      <TypographySmall>
        {dictionary.dashboard["user.inventory.box"]}
      </TypographySmall>
      <div className="flex flex-wrap gap-5">
        {loading ? (
          <>
            <Skeleton className="h-[85px] flex-1" />
            <Skeleton className="h-[85px] flex-1" />
          </>
        ) : userBoxes.length > 0 ? (
          userBoxes.map((userBox) => (
            <TooltipProvider key={userBox.box}>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex h-[85px] flex-col items-center justify-between gap-1 rounded-lg border p-2">
                    <Image
                      src={`/box/Box${userBox.box.toString()}.png`}
                      alt={userBox.box.toString()}
                      width={36}
                      height={36}
                    />
                    {Number(userBox.amount)}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{userBox.box}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))
        ) : (
          <div className="flex flex-col justify-center gap-1 rounded-lg border p-2">
            <TypographyMuted>
              {dictionary.dashboard["user.inventory.box.empty"]}
            </TypographyMuted>
          </div>
        )}
      </div>
    </>
  );
}
