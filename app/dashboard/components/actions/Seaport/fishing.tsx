import { useDictionaryStore } from "@/store/dictionary-store";
import ActionBase from "../action-base";
import { useUserStore } from "@/store/user-store";
import { useJobStore } from "@/store/job-store";
import { useToast } from "@/components/ui/use-toast";
import { Location } from "@prisma/client";
import {
  DashboardTab,
  useDashboardTabStore,
} from "@/store/dashboard-tab-store";

export default function ActionSeaportFishing() {
  const setUserLocation = useUserStore((state) => state.setUserLocation);
  const setActiveTab = useDashboardTabStore((state) => state.setActiveTab);
  const startFishingJob = useJobStore((state) => state.startFishingJob);
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { toast } = useToast();

  const handleClick = () => {
    setUserLocation(Location.Fishing);
    setActiveTab(DashboardTab.about);
    startFishingJob();
    toast({
      title: "Fishing started",
      description: "...",
    });
  };

  return (
    <ActionBase
      label={dictionary.dashboard["dashboard.actions.seaport.fishing.label"]}
      description={
        dictionary.dashboard["dashboard.actions.seaport.fishing.description"]
      }
      buttonLabel={
        dictionary.dashboard["dashboard.actions.seaport.fishing.button-label"]
      }
      onClick={handleClick}
    />
  );
}