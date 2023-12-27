"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useExploreJobStore } from "@/store/explore-job-store";
import { useUserStore } from "@/store/user-store";
import formatString from "@/util/format-string";
import { useEventDetails } from "@trigger.dev/react";
import { toast } from "sonner";

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
  const { data } = useEventDetails(exploreJobData.jobId);

  useEffect(() => {
    const firstRun = data?.runs.at(0);

    if (!firstRun) return;

    if (firstRun.status === "SUCCESS") {
      resetExploreJobData();
      setUserLocation(exploreJobData.returnLocation);

      toast.success(
        exploreJobData.successGatherings.length
          ? formatString(
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
            ) // @ts-ignore Implicit any
          : dictionary.dashboard[
              `actions.${exploreJobData.returnLocation.toLowerCase()}.explore.toast.failed`
            ],
        {
          duration: Infinity,
        }
      );
    } else if (firstRun.status === "FAILURE") {
      resetExploreJobData();
      setUserLocation(exploreJobData.returnLocation);

      toast.error(dictionary.unexpectedError.title, {
        description: dictionary.unexpectedError["explore.job"],
        duration: Infinity,
      });
    }
  }, [
    data?.runs,
    exploreJobData,
    resetExploreJobData,
    setUserLocation,
    dictionary,
  ]);

  return children;
};

export default ExploreProvider;
