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
import { UserWithCrop, getUserCrops } from "@/data-access/crop";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserStore } from "@/store/user-store";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function InventoryCrops() {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const user = useUserStore((state) => state.user);
  const [userCrops, setUserCrops] = useState<UserWithCrop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (user.id !== "") {
      getUserCrops(user.id).then((userCrops) => {
        setUserCrops(userCrops);
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <>
      <TypographySmall>
        {dictionary.dashboard["info.inventory.crop"]}
      </TypographySmall>
      <div className="flex flex-wrap gap-5">
        {loading ? (
          <>
            <Skeleton className="h-[85px] flex-1" />
            <Skeleton className="h-[85px] flex-1" />
          </>
        ) : userCrops.length > 0 ? (
          userCrops.map((userCrop) => (
            <TooltipProvider key={userCrop.cropId}>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex h-[85px] flex-col items-center justify-between gap-1 rounded-lg border p-2">
                    <Image
                      src={`/crop/${userCrop.crop.name}.png`}
                      alt={userCrop.crop.name}
                      width={36}
                      height={36}
                    />
                    {Number(userCrop.amount)}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{userCrop.crop.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))
        ) : (
          <div className="flex flex-col justify-center gap-1 rounded-lg border p-2">
            <TypographyMuted>
              {dictionary.dashboard["info.inventory.crop.empty"]}
            </TypographyMuted>
          </div>
        )}
      </div>
    </>
  );
}
