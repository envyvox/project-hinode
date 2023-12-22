"use client";

import { useUserStore } from "@/store/user-store";
import { Location } from "@prisma/client";
import { useEventDetails } from "@trigger.dev/react";
import React, { useEffect } from "react";
import formatString from "@/util/format-string";
import Image from "next/image";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useToast } from "@/components/ui/use-toast";
import { useFishingJobStore } from "@/store/fishing-job-store";

type Props = {
  children: React.ReactNode;
};

const FishingProvider = ({ children }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const setUserLocation = useUserStore((state) => state.setUserLocation);
  const fishingJobData = useFishingJobStore((state) => state.fishingJobData);
  const { isSuccess, isError, data } = useEventDetails(fishingJobData.jobId);
  const resetFishingJobData = useFishingJobStore(
    (state) => state.resetFishingJobData,
  );
  const { toast } = useToast();

  useEffect(() => {
    const firstRun = data?.runs.at(0);

    if (!firstRun) {
      return;
    }

    if (isSuccess) {
      resetFishingJobData();
      setUserLocation(Location.Seaport);

      toast({
        description: formatString(
          dictionary.dashboard[
            "dashboard.actions.seaport.fishing.toast.complete"
          ],
          <Image
            className="mx-1 inline h-6 w-6"
            width={27}
            height={27}
            src={`/fish/${fishingJobData.fishName}.png`}
            alt={fishingJobData.fishName}
          />,
          // @ts-ignore Implicit any
          dictionary.item.fish[fishingJobData.fishName],
        ),
        duration: Infinity,
      });
    }
    if (isError) {
      resetFishingJobData();
      setUserLocation(Location.Seaport);
      toast({
        description: "Fishing failed...",
        variant: "destructive",
      });
    }
  }, [
    data,
    dictionary,
    fishingJobData.fishName,
    isError,
    isSuccess,
    resetFishingJobData,
    setUserLocation,
    toast,
  ]);

  return children;
};

export default FishingProvider;
