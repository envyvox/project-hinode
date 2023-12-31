"use client";

import {
  DashboardTab,
  useDashboardTabStore,
} from "@/store/dashboard-tab-store";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserStore } from "@/store/user-store";
import { Location } from "@prisma/client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardAbout from "@/components/dashboard/dashboard-about";
import DashboardActions from "@/components/dashboard/dashboard-actions";
import DashboardTransit from "@/components/dashboard/dashboard-transit";

const locationsWithTabs: Location[] = [
  Location.Capital,
  Location.Castle,
  Location.Seaport,
  Location.Garden,
  Location.Village,
];

const Dashboard = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const activeTab = useDashboardTabStore((state) => state.activeTab);
  const setActiveTab = useDashboardTabStore((state) => state.setActiveTab);
  const userLocation = useUserStore((state) => state.user).location;
  const showTabs = locationsWithTabs.includes(userLocation);

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={(tab) => setActiveTab(tab as DashboardTab)}
    >
      <TabsList className="flex w-full flex-wrap justify-start gap-x-5">
        <TabsTrigger
          value={DashboardTab.about}
          className="min-h-[32px] min-w-[100px]"
        >
          {dictionary.dashboard["about"]}
        </TabsTrigger>
        {showTabs && (
          <>
            <TabsTrigger value={DashboardTab.actions}>
              {dictionary.dashboard["actions"]}
            </TabsTrigger>
            <TabsTrigger value={DashboardTab.transit}>
              {dictionary.dashboard["transit"]}
            </TabsTrigger>
          </>
        )}
      </TabsList>
      <TabsContent value={DashboardTab.about}>
        <DashboardAbout />
      </TabsContent>
      <TabsContent value={DashboardTab.actions}>
        <DashboardActions />
      </TabsContent>
      <TabsContent value={DashboardTab.transit}>
        <DashboardTransit />
      </TabsContent>
    </Tabs>
  );
};

export default Dashboard;
