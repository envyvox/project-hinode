import { getWorldState } from "@/services/data-access/world-state";
import { WorldState } from "@prisma/client";
import { create } from "zustand";

type WorldStateType = {
  worldState: WorldState;
  getWorldState: () => void;
};

export const useWorldStateStore = create<WorldStateType>((set) => ({
  worldState: {
    id: "",
    season: "Autumn",
    weatherToday: "Clear",
    weatherTomorrow: "Clear",
  },
  getWorldState: async () => {
    const worldState = await getWorldState();
    set({ worldState });
  },
}));
