import { useExploreJobStore } from "@/store/explore-job-store";

const ExploreJobTimer = () => {
  const exploreJobData = useExploreJobStore((state) => state.exploreJobData);
  const deliverAt = new Date(exploreJobData.deliverAt);

  return deliverAt.toLocaleTimeString("en", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default ExploreJobTimer;
