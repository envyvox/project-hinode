import { getUser } from "@/lib/get-user";
import { User } from "@prisma/client";
import { create } from "zustand";

type UserState = {
  user: User;
  getUser: (email: string) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: "",
    name: null,
    email: null,
    emailVerified: null,
    about: null,
    image: null,
    accessRole: "User",
  },
  getUser: async (email: string) => {
    const user = await getUser(email);
    set({ user });
  },
}));
