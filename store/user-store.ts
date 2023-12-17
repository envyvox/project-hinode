import {
  GameUser,
  getUser,
  updateUserLocation,
} from "@/services/data-access/user";
import { Location } from "@prisma/client";
import { create } from "zustand";

type UserState = {
  user: GameUser;
  getUser: (email: string) => void;
  setUserLocation: (location: Location) => void;
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
}));
