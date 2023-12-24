import { sendEventFishing } from "@/jobs/triggers";
import { getRandomFishWithParams } from "@/services/data-access/fish";
import { getWorldState } from "@/services/data-access/world-state";
import getRandomFishRarity from "@/util/get-random-fish-rarity";
import { TimesDay } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { useUserStore } from "./user-store";

type FishingJobData = {
  jobId: string;
  fishName: string;
  deliverAt: Date;
};

type FishingJobState = {
  fishingJobData: FishingJobData;
  resetFishingJobData: () => void;
  startFishingJob: () => Promise<void>;
};

const emptyFishingData: FishingJobData = {
  jobId: "",
  fishName: "",
  deliverAt: new Date(),
};

export const useFishingJobStore = create<FishingJobState>()(
  persist(
    (set) => ({
      fishingJobData: emptyFishingData,
      resetFishingJobData: () => set({ fishingJobData: emptyFishingData }),
      startFishingJob: async () => {
        const rarity = getRandomFishRarity();
        const worldState = await getWorldState();
        const timesDay = TimesDay.Day;

        const randomFish = await getRandomFishWithParams(
          rarity,
          worldState.weatherToday,
          timesDay,
          worldState.season
        );

        const userId = useUserStore.getState().user.id;
        const timeNow = new Date();
        const deliverAt = new Date(timeNow.getTime() + 5 * 60000); // 5 minutes
        const jobId = await sendEventFishing(userId, randomFish.id, deliverAt);

        set({
          fishingJobData: {
            jobId: jobId,
            fishName: randomFish.name,
            deliverAt: deliverAt,
          },
        });
      },
    }),
    {
      name: "fishing-job-store",
    }
  )
);
