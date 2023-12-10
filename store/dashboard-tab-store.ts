import { create } from "zustand";

export enum DashboardTab {
  about = "About",
  actions = "Actions",
  transit = "Transit",
}

type DashboardTabState = {
  activeTab: DashboardTab;
  setActiveTab: (activeTab: DashboardTab) => void;
};

export const useDashboardTabStore = create<DashboardTabState>((set) => ({
  activeTab: DashboardTab.about,
  setActiveTab: (activeTab: DashboardTab) => {
    set({ activeTab });
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
}));
