"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardAboutLocation from "./components/about";
import DashboardActions from "./components/actions";
import DashboardTransit from "./components/transit";
import { useDictionaryStore } from "@/store/dictionary-store";

export default function Dashboard() {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  return (
    <Tabs defaultValue="about">
      <TabsList className="flex h-fit w-full flex-wrap justify-start gap-x-5">
        <TabsTrigger value="about">
          {dictionary.dashboard["dashboard.about"]}
        </TabsTrigger>
        <TabsTrigger value="actions">
          {dictionary.dashboard["dashboard.actions"]}
        </TabsTrigger>
        <TabsTrigger value="transit">
          {dictionary.dashboard["dashboard.transit"]}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="about">
        <DashboardAboutLocation />
      </TabsContent>
      <TabsContent value="actions">
        <DashboardActions />
      </TabsContent>
      <TabsContent value="transit">
        <DashboardTransit />
      </TabsContent>
    </Tabs>
  );
}
