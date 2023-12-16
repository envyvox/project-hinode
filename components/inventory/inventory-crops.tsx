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
import UseUserCrop from "@/hooks/use-user-crop";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserCropStore } from "@/store/user-crop-store";
import Image from "next/image";
import InventorySkeleton from "./inventory-skeleton";

const InventoryCrops = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const loading = useUserCropStore((state) => state.loading);
  const userCrops = useUserCropStore((state) => state.userCrops);

  UseUserCrop();

  return (
    <>
      <TypographySmall>
        {dictionary.dashboard["user.inventory.crop"]}
      </TypographySmall>
      <div className="flex flex-wrap gap-5">
        {loading ? (
          <InventorySkeleton />
        ) : userCrops.length ? (
          userCrops.map((userCrop) => (
            <TooltipProvider key={userCrop.cropId}>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex h-[85px] flex-col items-center justify-between gap-1 rounded-lg border bg-card p-2 text-card-foreground shadow-sm">
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
              {dictionary.dashboard["user.inventory.crop.empty"]}
            </TypographyMuted>
          </div>
        )}
      </div>
    </>
  );
};

export default InventoryCrops;
