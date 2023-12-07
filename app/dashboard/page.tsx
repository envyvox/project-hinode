"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardAboutLocation from "./components/about";
import DashboardActions from "./components/actions";
import DashboardTransit from "./components/transit";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useState } from "react";

export enum DashboardTab {
  about = "About",
  actions = "Actions",
  transit = "Transit",
}

export default function Dashboard() {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const [activeTab, setActiveTab] = useState<string>(DashboardTab.about);

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={(tab) => setActiveTab(tab)}
    >
      <TabsList className="flex h-fit w-full flex-wrap justify-start gap-x-5">
        <TabsTrigger value={DashboardTab.about}>
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
        <DashboardAboutLocation />
      </TabsContent>
      <TabsContent value={DashboardTab.actions}>
        <DashboardActions />
      </TabsContent>
      <TabsContent value={DashboardTab.transit}>
        <DashboardTransit setActiveTab={setActiveTab} />
      </TabsContent>
    </Tabs>
  );
}
