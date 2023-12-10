import { sendEventFishing } from "@/jobs/triggers";
import { create } from "zustand";
import { useUserStore } from "./user-store";
import getRandomFishRarity from "@/lib/get-random-fish-rarity";
import { Season, TimesDay, Weather } from "@prisma/client";
import { getRandomFishWithParams } from "@/data-access/fish";

type JobState = {
  fishingJobData: {
    jobId: string;
    fishName: string;
  };
  resetFishingJobData: () => void;
  startFishingJob: () => void;
};

const emptyFishingData = {
  jobId: "",
  fishName: "",
};

export const useJobStore = create<JobState>((set) => ({
  fishingJobData: emptyFishingData,
  resetFishingJobData: () => set({ fishingJobData: emptyFishingData }),
  startFishingJob: async () => {
    const rarity = getRandomFishRarity();
    const weather = Weather.Clear;
    const timesDay = TimesDay.Day;
    const season = Season.Spring;

    const randomFish = await getRandomFishWithParams(
      rarity,
      weather,
      timesDay,
      season,
    );

    const userId = useUserStore.getState().user.id;
    const jobId = await sendEventFishing(userId, randomFish.id);

    set({ fishingJobData: { jobId: jobId, fishName: randomFish.name } });
  },
}));
