import { create } from "zustand";

export type Dictionary = {
  sidebar: {
    "category.info": string;
    "category.info.child.profile": string;
    "category.info.child.inventory": string;
    "category.info.child.reputation": string;
    "category.info.child.collection": string;
    "category.info.child.banners": string;
    "category.info.child.achievements": string;
    "category.world": string;
    "category.world.child.rating": string;
    "category.world.child.info": string;
  };
  header: {
    "user.not-signed-in": string;
    "user.sign-in": string;
    "user.sign-out": string;
    "langulage-switcher.langulage": string;
  };
  dashboard: {
    "info.profile.username": string;
    "info.profile.email": string;
    "info.profile.about": string;
    "info.profile.about-placeholder": string;
    "info.profile.save": string;
    "info.inventory.currency": string;
    "info.inventory.currency.empty": string;
    "info.inventory.product": string;
    "info.inventory.product.empty": string;
    "info.inventory.seed": string;
    "info.inventory.seed.empty": string;
    "info.inventory.crop": string;
    "info.inventory.crop.empty": string;
  };
};

type DictionaryState = {
  dictionary: Dictionary;
  setDictionary: (dictionary: Dictionary) => void;
};

export const useDictionaryStore = create<DictionaryState>((set) => ({
  dictionary: {
    sidebar: {
      "category.info": "",
      "category.info.child.profile": "",
      "category.info.child.inventory": "",
      "category.info.child.reputation": "",
      "category.info.child.collection": "",
      "category.info.child.banners": "",
      "category.info.child.achievements": "",
      "category.world": "",
      "category.world.child.rating": "",
      "category.world.child.info": "",
    },
    header: {
      "user.not-signed-in": "",
      "user.sign-in": "",
      "user.sign-out": "",
      "langulage-switcher.langulage": "",
    },
    dashboard: {
      "info.profile.username": "",
      "info.profile.email": "",
      "info.profile.about": "",
      "info.profile.about-placeholder": "",
      "info.profile.save": "",
      "info.inventory.currency": "",
      "info.inventory.currency.empty": "",
      "info.inventory.product": "",
      "info.inventory.product.empty": "",
      "info.inventory.seed": "",
      "info.inventory.seed.empty": "",
      "info.inventory.crop": "",
      "info.inventory.crop.empty": ""
    },
  },
  setDictionary: (dictionary: Dictionary) => set({ dictionary }),
}));
