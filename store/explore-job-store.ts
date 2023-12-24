import { sendEventExplore } from "@/jobs/triggers";
import { getGatheringsInLocation } from "@/services/data-access/gathering";
import getSuccessAmount from "@/util/get-success-amount";
import { GatheringPropertyType, Location } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { useUserStore } from "./user-store";

type ExploreJobData = {
  jobId: string;
  successGatherings: SuccessGathering[];
  returnLocation: Location;
  deliverAt: Date;
};

export type SuccessGathering = {
  gatheringId: string;
  gatheringName: string;
  amount: number;
};

type ExploreJobState = {
  exploreJobData: ExploreJobData;
  resetExploreJobData: () => void;
  startExploreJob: (
    exploreLocation: Location,
    returnLocation: Location
  ) => Promise<void>;
};

const emptyExploreData: ExploreJobData = {
  jobId: "",
  successGatherings: [],
  returnLocation: Location.Capital,
  deliverAt: new Date(),
};

export const useExploreJobStore = create<ExploreJobState>()(
  persist(
    (set) => ({
      exploreJobData: emptyExploreData,
      resetExploreJobData: () => set({ exploreJobData: emptyExploreData }),
      startExploreJob: async (
        exploreLocation: Location,
        returnLocation: Location
      ) => {
        const gatherings = await getGatheringsInLocation(exploreLocation);
        const user = useUserStore.getState().user;
        const successGatherings: SuccessGathering[] = [];

        gatherings.forEach((gathering) => {
          const chance =
            gathering.properties.find(
              (gp) => gp.property === GatheringPropertyType.GatheringChance
            )?.value ?? 0;
          const doubleChance =
            gathering.properties.find(
              (gp) =>
                gp.property === GatheringPropertyType.GatheringDoubleChance
            )?.value ?? 0;
          const amount =
            gathering.properties.find(
              (gp) => gp.property === GatheringPropertyType.GatheringAmount
            )?.value ?? 0;
          const successAmount = getSuccessAmount(chance, doubleChance, amount);

          if (successAmount < 1) return;

          successGatherings.push({
            gatheringId: gathering.id,
            gatheringName: gathering.name,
            amount: amount,
          });
        });

        const timeNow = new Date();
        const deliverAt = new Date(timeNow.getTime() + 5 * 60000); // 5 minutes

        const jobId = await sendEventExplore(
          user.id,
          successGatherings,
          returnLocation,
          deliverAt
        );

        set({
          exploreJobData: {
            jobId: jobId,
            successGatherings: successGatherings,
            returnLocation: returnLocation,
            deliverAt: deliverAt,
          },
        });
      },
    }),
    {
      name: "gathering-job-store",
    }
  )
);
