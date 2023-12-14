import { useDictionaryStore } from "@/store/dictionary-store";
import ActionBase from "../action-base";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user-store";
import { useToast } from "@/components/ui/use-toast";
import {
  DashboardTab,
  useDashboardTabStore,
} from "@/store/dashboard-tab-store";
import { Location } from "@prisma/client";
import { useJobStore } from "@/store/job-store";

export default function ActionCastleExploreCastle() {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const setUserLocation = useUserStore((state) => state.setUserLocation);
  const setActiveTab = useDashboardTabStore((state) => state.setActiveTab);
  const startExploreJob = useJobStore((state) => state.startExploreJob);
  const { toast } = useToast();

  const handleClick = () => {
    setUserLocation(Location.ExploreCastle);
    setActiveTab(DashboardTab.about);
    startExploreJob(Location.ExploreCastle, Location.Castle);

    toast({
      description:
        dictionary.dashboard["dashboard.actions.castle.explore.toast.start"],
    });
  };

  return (
    <ActionBase
      label={dictionary.dashboard["dashboard.actions.castle.explore.label"]}
      description={
        dictionary.dashboard["dashboard.actions.castle.explore.description"]
      }
      actionComponent={
        <Button
          className="mt-2 w-fit self-end"
          variant="secondary"
          onClick={handleClick}
        >
          {
            dictionary.dashboard[
              "dashboard.actions.castle.explore.button-label"
            ]
          }
        </Button>
      }
    />
  );
}
