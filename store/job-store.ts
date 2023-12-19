import { sendEventExplore, sendEventFishing } from "@/jobs/triggers";
import { create } from "zustand";
import { useUserStore } from "./user-store";
import getRandomFishRarity from "@/util/get-random-fish-rarity";
import { GatheringPropertyType, Location, TimesDay } from "@prisma/client";
import { getRandomFishWithParams } from "@/services/data-access/fish";
import { getGatheringsInLocation } from "@/services/data-access/gathering";
import getSuccessAmount from "@/util/get-success-amount";
import { getWorldState } from "@/services/data-access/world-state";

export type SuccessGathering = {
  gatheringId: string;
  gatheringName: string;
  amount: number;
};

type JobState = {
  fishingJobData: {
    jobId: string;
    fishName: string;
  };
  exploreJobData: {
    jobId: string;
    successGatherings: SuccessGathering[];
    returnLocation: Location;
  };
  resetFishingJobData: () => void;
  resetExploreJobData: () => void;
  startFishingJob: () => void;
  startExploreJob: (
    exploreLocation: Location,
    returnLocation: Location,
  ) => void;
};

const emptyFishingData = {
  jobId: "",
  fishName: "",
};

const emptyExploreData = {
  jobId: "",
  successGatherings: [],
  returnLocation: Location.Capital,
};

export const useJobStore = create<JobState>((set) => ({
  fishingJobData: emptyFishingData,
  exploreJobData: emptyExploreData,
  resetFishingJobData: () => set({ fishingJobData: emptyFishingData }),
  resetExploreJobData: () => set({ exploreJobData: emptyExploreData }),
  startFishingJob: async () => {
    const rarity = getRandomFishRarity();
    const worldState = await getWorldState();
    const timesDay = TimesDay.Day;

    const randomFish = await getRandomFishWithParams(
      rarity,
      worldState.weatherToday,
      timesDay,
      worldState.season,
    );

    const userId = useUserStore.getState().user.id;
    const jobId = await sendEventFishing(userId, randomFish.id);

    set({
      fishingJobData: {
        jobId: jobId,
        fishName: randomFish.name,
      },
    });
  },
  startExploreJob: async (
    exploreLocation: Location,
    returnLocation: Location,
  ) => {
    const gatherings = await getGatheringsInLocation(exploreLocation);
    const user = useUserStore.getState().user;
    const successGatherings: SuccessGathering[] = [];

    gatherings.forEach((gathering) => {
      const chance =
        gathering.properties.find(
          (gp) => gp.property === GatheringPropertyType.GatheringChance,
        )?.value ?? 0;
      const doubleChance =
        gathering.properties.find(
          (gp) => gp.property === GatheringPropertyType.GatheringDoubleChance,
        )?.value ?? 0;
      const amount =
        gathering.properties.find(
          (gp) => gp.property === GatheringPropertyType.GatheringAmount,
        )?.value ?? 0;
      const successAmount = getSuccessAmount(chance, doubleChance, amount);

      if (successAmount < 1) return;

      successGatherings.push({
        gatheringId: gathering.id,
        gatheringName: gathering.name,
        amount: amount,
      });
    });

    const jobId = await sendEventExplore(
      user.id,
      successGatherings,
      returnLocation,
    );

    set({
      exploreJobData: {
        jobId: jobId,
        successGatherings: successGatherings,
        returnLocation: returnLocation,
      },
    });
  },
}));
