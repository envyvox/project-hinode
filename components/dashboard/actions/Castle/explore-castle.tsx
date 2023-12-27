import {
  DashboardTab,
  useDashboardTabStore,
} from "@/store/dashboard-tab-store";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useExploreJobStore } from "@/store/explore-job-store";
import { useUserStore } from "@/store/user-store";
import { Location } from "@prisma/client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import DashboardActionBase from "../dashboard-action-base";

const ActionCastleExploreCastle = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const setUserLocation = useUserStore((state) => state.setUserLocation);
  const setActiveTab = useDashboardTabStore((state) => state.setActiveTab);
  const startExploreJob = useExploreJobStore((state) => state.startExploreJob);

  const handleClick = () => {
    setUserLocation(Location.ExploreCastle);
    setActiveTab(DashboardTab.about);
    startExploreJob(Location.ExploreCastle, Location.Castle);

    toast.success(dictionary.dashboard["actions.castle.explore.toast.start"]);
  };

  return (
    <DashboardActionBase
      label={dictionary.dashboard["actions.castle.explore.label"]}
      description={dictionary.dashboard["actions.castle.explore.description"]}
      actionComponent={
        <Button
          className="mt-2 w-fit self-end"
          variant="secondary"
          onClick={handleClick}
        >
          {dictionary.dashboard["actions.castle.explore.button-label"]}
        </Button>
      }
    />
  );
};

export default ActionCastleExploreCastle;
