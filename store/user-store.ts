import { getUser, updateUserLocation } from "@/lib/game/user";
import { Location, User } from "@prisma/client";
import { create } from "zustand";

type UserState = {
  user: User;
  getUser: (email: string) => void;
  setUserLocation: (location: Location) => void;
};

export const useUserStore = create<UserState>((set, get) => ({
  user: {
    id: "",
    name: null,
    email: null,
    emailVerified: null,
    about: null,
    image: null,
    accessRole: "User",
    location: "Capital",
    createdAt: new Date(),
    updatedAt: new Date(),
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
