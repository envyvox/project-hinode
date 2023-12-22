import { useFishingJobStore } from "@/store/fishing-job-store";

const FishingJobTimer = () => {
  const fishingJobData = useFishingJobStore((state) => state.fishingJobData);
  const deliverAt = new Date(fishingJobData.deliverAt);

  return deliverAt.toLocaleTimeString("en", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default FishingJobTimer;
