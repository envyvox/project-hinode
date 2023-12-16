"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useDictionaryStore } from "@/store/dictionary-store";
import {
  DashboardTab,
  useDashboardTabStore,
} from "@/store/dashboard-tab-store";
import DashboardAbout from "@/components/dashboard/dashboard-about";
import DashboardActions from "@/components/dashboard/dashboard-actions";
import DashboardTransit from "@/components/dashboard/dashboard-transit";

const Dashboard = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const activeTab = useDashboardTabStore((state) => state.activeTab);
  const setActiveTab = useDashboardTabStore((state) => state.setActiveTab);

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
          {dictionary.dashboard["dashboard.about"]}
        </TabsTrigger>
        <TabsTrigger value={DashboardTab.actions}>
          {dictionary.dashboard["dashboard.actions"]}
        </TabsTrigger>
        <TabsTrigger value={DashboardTab.transit}>
          {dictionary.dashboard["dashboard.transit"]}
        </TabsTrigger>
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
