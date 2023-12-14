"use client";

import { useJobStore } from "@/store/job-store";
import { useUserStore } from "@/store/user-store";
import { useEventDetails } from "@trigger.dev/react";
import React, { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { formatString } from "@/util/format-string";
import Image from "next/image";
import { useDictionaryStore } from "@/store/dictionary-store";

type Props = {
  children: React.ReactNode;
};

export default function ExploreProvider({ children }: Props) {
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
            dictionary.dashboard[
              "dashboard.actions.castle.explore.toast.success"
            ],
            exploreJobData.successGatherings
              .map((gathering) => {
                return [
                  <Image
                    className="mx-1 h-6 w-6"
                    width={27}
                    height={27}
                    src={`/gathering/${gathering.gatheringName}`}
                    alt={gathering.gatheringName}
                  />,
                  gathering.amount,
                  gathering.gatheringName,
                ];
              })
              .join(", "),
          ),
        });
      } else {
        toast({
          description:
            dictionary.dashboard[
              "dashboard.actions.castle.explore.toast.failed"
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
}
