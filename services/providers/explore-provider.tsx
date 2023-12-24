"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useExploreJobStore } from "@/store/explore-job-store";
import { useUserStore } from "@/store/user-store";
import formatString from "@/util/format-string";
import { useEventDetails } from "@trigger.dev/react";

import { useToast } from "@/components/ui/use-toast";

type Props = {
  children: React.ReactNode;
};

const ExploreProvider = ({ children }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const setUserLocation = useUserStore((state) => state.setUserLocation);
  const exploreJobData = useExploreJobStore((state) => state.exploreJobData);
  const resetExploreJobData = useExploreJobStore(
    (state) => state.resetExploreJobData
  );
  const { isSuccess, isError, data } = useEventDetails(exploreJobData.jobId);
  const { toast } = useToast();

  useEffect(() => {
    const firstRun = data?.runs.at(0);

    if (!firstRun) {
      return;
    }

    if (isSuccess) {
      resetExploreJobData();
      setUserLocation(exploreJobData.returnLocation);

      if (exploreJobData.successGatherings.length) {
        toast({
          description: formatString(
            // @ts-ignore Implicit any
            dictionary.dashboard[
              `actions.${exploreJobData.returnLocation.toLowerCase()}.explore.toast.success`
            ],
            exploreJobData.successGatherings.map((gathering) => {
              return [
                <Image
                  className="mx-1 inline h-6 w-6"
                  width={27}
                  height={27}
                  src={`/gathering/${gathering.gatheringName}.png`}
                  alt={gathering.gatheringName}
                />,
                `${gathering.amount} ${
                  // @ts-ignore Implicit any
                  dictionary.item.gathering[gathering.gatheringName]
                }`,
              ];
            })
          ),
          duration: Infinity,
        });
      } else {
        toast({
          description:
            // @ts-ignore Implicit any
            dictionary.dashboard[
              `actions.${exploreJobData.returnLocation.toLowerCase()}.explore.toast.failed`
            ],
        });
      }
    }
    if (isError) {
      resetExploreJobData();
      setUserLocation(exploreJobData.returnLocation);

      toast({
        description: "Explore failed...",
        variant: "destructive",
      });
    }
  }, [
    data,
    isSuccess,
    isError,
    exploreJobData,
    resetExploreJobData,
    toast,
    setUserLocation,
    dictionary,
  ]);

  return children;
};

export default ExploreProvider;
