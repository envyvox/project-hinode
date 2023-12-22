import { useDictionaryStore } from "@/store/dictionary-store";
import DashboardActionBase from "../dashboard-action-base";
import { useUserStore } from "@/store/user-store";
import { useToast } from "@/components/ui/use-toast";
import { Location } from "@prisma/client";
import {
  DashboardTab,
  useDashboardTabStore,
} from "@/store/dashboard-tab-store";
import { Button } from "@/components/ui/button";
import { useFishingJobStore } from "@/store/fishing-job-store";

const ActionSeaportFishing = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const setUserLocation = useUserStore((state) => state.setUserLocation);
  const setActiveTab = useDashboardTabStore((state) => state.setActiveTab);
  const startFishingJob = useFishingJobStore((state) => state.startFishingJob);
  const { toast } = useToast();

  const handleClick = () => {
    setUserLocation(Location.Fishing);
    setActiveTab(DashboardTab.about);
    startFishingJob();

    toast({
      description:
        dictionary.dashboard["dashboard.actions.seaport.fishing.toast.start"],
    });
  };

  return (
    <DashboardActionBase
      label={dictionary.dashboard["dashboard.actions.seaport.fishing.label"]}
      description={
        dictionary.dashboard["dashboard.actions.seaport.fishing.description"]
      }
      actionComponent={
        <Button
          className="mt-2 w-fit self-end"
          variant="secondary"
          onClick={handleClick}
        >
          {
            dictionary.dashboard[
              "dashboard.actions.seaport.fishing.button-label"
            ]
          }
        </Button>
      }
    />
  );
};

export default ActionSeaportFishing;
