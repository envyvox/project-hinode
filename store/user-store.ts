import {
  GameUser,
  getUser,
  updateUserLocation,
  updateUserTitle,
} from "@/services/data-access/user";
import { Location, Title } from "@prisma/client";
import { create } from "zustand";

type UserState = {
  user: GameUser;
  getUser: (email: string) => void;
  setUserLocation: (location: Location) => void;
  setUserTitle: (title: Title) => void;
};

export const useUserStore = create<UserState>((set, get) => ({
  user: {
    id: "",
    name: null,
    displayName: null,
    about: null,
    image: null,
    level: 0,
    xp: 0,
    location: "Capital",
    title: "Newbie",
  },
  getUser: async (email: string) => {
    const user = await getUser(email);
    set({ user });
  },
  setUserLocation: async (location: Location) => {
    const user = await updateUserLocation(get().user.id, location);
    set({ user });
  },
  setUserTitle: async (title: Title) => {
    const user = await updateUserTitle(get().user.id, title);
    set({ user });
  },
}));
