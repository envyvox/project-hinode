"use client";

import { useJobStore } from "@/store/job-store";
import { useUserStore } from "@/store/user-store";
import { Location } from "@prisma/client";
import { useEventDetails } from "@trigger.dev/react";
import React, { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { formatString } from "@/util/format-string";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
};

export default function FishingProvider({ children }: Props) {
  const setUserLocation = useUserStore((state) => state.setUserLocation);
  const fishingJobData = useJobStore((state) => state.fishingJobData);
  const { isSuccess, isError } = useEventDetails(fishingJobData.jobId);
  const resetFishingJobData = useJobStore((state) => state.resetFishingJobData);
  const { toast } = useToast();

  useEffect(() => {
    if (isSuccess) {
      resetFishingJobData();
      setUserLocation(Location.Seaport);
      toast({
        title: "Fishing completed",
        description: formatString(
          "You got {0} {1}.",
          <Image
            className="mx-1 h-6 w-6"
            width={27}
            height={27}
            src={`/fish/${fishingJobData.fishName}.png`}
            alt={fishingJobData.fishName}
          />,
          fishingJobData.fishName,
        ),
      });
    }
    if (isError) {
      resetFishingJobData();
      setUserLocation(Location.Seaport);
      toast({
        title: "Fishing failed",
        description: "...",
        variant: "destructive",
      });
    }
  }, [
    isSuccess,
    isError,
    fishingJobData,
    resetFishingJobData,
    setUserLocation,
    toast,
  ]);

  return children;
}
