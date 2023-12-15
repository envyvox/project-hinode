import { useDictionaryStore } from "@/store/dictionary-store";
import ActionBase from "../action-base";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user-store";
import {
  DashboardTab,
  useDashboardTabStore,
} from "@/store/dashboard-tab-store";
import { useJobStore } from "@/store/job-store";
import { useToast } from "@/components/ui/use-toast";
import { Location } from "@prisma/client";

export default function ActionGardenExpoloreGarden() {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const setUserLocation = useUserStore((state) => state.setUserLocation);
  const setActiveTab = useDashboardTabStore((state) => state.setActiveTab);
  const startExploreJob = useJobStore((state) => state.startExploreJob);
  const { toast } = useToast();

  const handleClick = () => {
    setUserLocation(Location.ExploreGarden);
    setActiveTab(DashboardTab.about);
    startExploreJob(Location.ExploreGarden, Location.Garden);

    toast({
      description:
        dictionary.dashboard["dashboard.actions.garden.explore.toast.start"],
    });
  };

  return (
    <ActionBase
      label={dictionary.dashboard["dashboard.actions.garden.explore.label"]}
      description={
        dictionary.dashboard["dashboard.actions.garden.explore.description"]
      }
      actionComponent={
        <Button
          className="mt-2 w-fit self-end"
          variant="secondary"
          onClick={handleClick}
        >
          {
            dictionary.dashboard[
              "dashboard.actions.garden.explore.button-label"
            ]
          }
        </Button>
      }
    />
  );
}
