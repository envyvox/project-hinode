import {
  DashboardTab,
  useDashboardTabStore,
} from "@/store/dashboard-tab-store";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useFishingJobStore } from "@/store/fishing-job-store";
import { useUserStore } from "@/store/user-store";
import { Location } from "@prisma/client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import DashboardActionBase from "../dashboard-action-base";

const ActionSeaportFishing = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const setUserLocation = useUserStore((state) => state.setUserLocation);
  const setActiveTab = useDashboardTabStore((state) => state.setActiveTab);
  const startFishingJob = useFishingJobStore((state) => state.startFishingJob);

  const handleClick = () => {
    setUserLocation(Location.Fishing);
    setActiveTab(DashboardTab.about);
    startFishingJob();

    toast.success(dictionary.dashboard["actions.seaport.fishing.toast.start"]);
  };

  return (
    <DashboardActionBase
      label={dictionary.dashboard["actions.seaport.fishing.label"]}
      description={dictionary.dashboard["actions.seaport.fishing.description"]}
      actionComponent={
        <Button
          className="mt-2 w-fit self-end"
          variant="secondary"
          onClick={handleClick}
        >
          {dictionary.dashboard["actions.seaport.fishing.button-label"]}
        </Button>
      }
    />
  );
};

export default ActionSeaportFishing;
