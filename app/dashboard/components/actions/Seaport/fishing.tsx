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
import { Button } from "@/components/ui/button";

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
      description:
        dictionary.dashboard["dashboard.actions.seaport.fishing.toast.start"],
    });
  };

  return (
    <ActionBase
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
}
