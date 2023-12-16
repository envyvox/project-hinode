"use client";

import { useJobStore } from "@/store/job-store";
import { useUserStore } from "@/store/user-store";
import { useEventDetails } from "@trigger.dev/react";
import React, { useEffect } from "react";
import formatString from "@/util/format-string";
import Image from "next/image";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  children: React.ReactNode;
};

const ExploreProvider = ({ children }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const setUserLocation = useUserStore((state) => state.setUserLocation);
  const exploreJobData = useJobStore((state) => state.exploreJobData);
  const resetExploreJobData = useJobStore((state) => state.resetExploreJobData);
  const { isSuccess, isError } = useEventDetails(exploreJobData.jobId);
  const { toast } = useToast();

  useEffect(() => {
    if (isSuccess) {
      resetExploreJobData();
      setUserLocation(exploreJobData.returnLocation);

      if (exploreJobData.successGatherings.length) {
        toast({
          description: formatString(
            // @ts-ignore Implicit any
            dictionary.dashboard[
              `dashboard.actions.${exploreJobData.returnLocation.toLowerCase()}.explore.toast.success`
            ],
            exploreJobData.successGatherings.map((gathering) => {
              return [
                <Image
                  className="mx-1 h-6 w-6"
                  width={27}
                  height={27}
                  src={`/gathering/${gathering.gatheringName}.png`}
                  alt={gathering.gatheringName}
                />,
                `${gathering.amount} ${gathering.gatheringName}`,
              ];
            }),
          ),
        });
      } else {
        toast({
          description:
            // @ts-ignore Implicit any
            dictionary.dashboard[
              `dashboard.actions.${exploreJobData.returnLocation.toLowerCase()}.explore.toast.failed`
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
  }, [isSuccess, isError, exploreJobData, resetExploreJobData, toast]);

  return children;
};

export default ExploreProvider;
