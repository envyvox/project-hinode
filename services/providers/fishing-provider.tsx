import { useEffect } from "react";
import Image from "next/image";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useFishingJobStore } from "@/store/fishing-job-store";
import { useUserStore } from "@/store/user-store";
import formatString from "@/util/format-string";
import { Location } from "@prisma/client";
import { useEventDetails } from "@trigger.dev/react";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
};

const FishingProvider = ({ children }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const setUserLocation = useUserStore((state) => state.setUserLocation);
  const fishingJobData = useFishingJobStore((state) => state.fishingJobData);
  const { data } = useEventDetails(fishingJobData.jobId);
  const resetFishingJobData = useFishingJobStore(
    (state) => state.resetFishingJobData
  );

  useEffect(() => {
    const firstRun = data?.runs.at(0);

    if (!firstRun) return;

    if (firstRun.status === "SUCCESS") {
      resetFishingJobData();
      setUserLocation(Location.Seaport);

      toast.success(
        formatString(
          dictionary.dashboard["actions.seaport.fishing.toast.complete"],
          <Image
            className="mx-1 inline h-6 w-6"
            width={27}
            height={27}
            src={`/fish/${fishingJobData.fishName}.png`}
            alt={fishingJobData.fishName}
          />,
          // @ts-ignore Implicit any
          dictionary.item.fish[fishingJobData.fishName]
        ),
        {
          duration: Infinity,
        }
      );
    } else if (firstRun.status === "FAILURE") {
      resetFishingJobData();
      setUserLocation(Location.Seaport);

      toast.error(dictionary.unexpectedError.title, {
        description: dictionary.unexpectedError["fishing.job"],
        duration: Infinity,
      });
    }
  }, [
    data?.runs,
    dictionary,
    fishingJobData,
    resetFishingJobData,
    setUserLocation,
  ]);

  return children;
};

export default FishingProvider;
