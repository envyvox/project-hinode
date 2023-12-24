import { useDictionaryStore } from "@/store/dictionary-store";
import { useLangStore } from "@/store/lang-store";
import { useUserStore } from "@/store/user-store";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import DynamicDashboardAbout from "./dynamic-dashboard-about";

const DashboardAbout = () => {
  const lang = useLangStore((state) => state.lang);
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const userLocation = useUserStore((state) => state.user.location);

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>
          {/* TODO: Replace skeleton with Image */}
          <Skeleton className="h-[150px] w-full" />
        </CardTitle>
        <CardDescription className="scroll-m-20 pt-6 text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
          {dictionary.location[userLocation]}
        </CardDescription>
      </CardHeader>
      <CardContent className="leading-7 [&_p]:mt-6">
        <DynamicDashboardAbout lang={lang} userLocation={userLocation} />
      </CardContent>
    </Card>
  );
};

export default DashboardAbout;
