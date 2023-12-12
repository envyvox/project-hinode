import { create } from "zustand";

export type Dictionary = {
  sidebar: {
    "category.dashboard": string;
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
    "dashboard.about": string;
    "dashboard.actions": string;
    "dashboard.actions.capital.shop-seed.label": string;
    "dashboard.actions.capital.shop-seed.description": string;
    "dashboard.actions.capital.shop-seed.button-label": string;
    "dashboard.actions.capital.market.label": string;
    "dashboard.actions.capital.market.description": string;
    "dashboard.actions.capital.market.button-label": string;
    "dashboard.actions.capital.casino.label": string;
    "dashboard.actions.capital.casino.description": string;
    "dashboard.actions.capital.casino.button-label": string;
    "dashboard.actions.garden.shop-recipe.label": string;
    "dashboard.actions.garden.shop-recipe.description": string;
    "dashboard.actions.garden.shop-recipe.button-label": string;
    "dashboard.actions.garden.explore.label": string;
    "dashboard.actions.garden.explore.description": string;
    "dashboard.actions.garden.explore.button-label": string;
    "dashboard.actions.seaport.fishing.label": string;
    "dashboard.actions.seaport.fishing.description": string;
    "dashboard.actions.seaport.fishing.button-label": string;
    "dashboard.actions.seaport.fishing.toast.start": string;
    "dashboard.actions.seaport.fishing.toast.complete": string;
    "dashboard.actions.seaport.shop-fisher.label": string;
    "dashboard.actions.seaport.shop-fisher.description": string;
    "dashboard.actions.seaport.shop-fisher.button-label": string;
    "dashboard.actions.seaport.shop-fisher.sheet.close": string;
    "dashboard.actions.seaport.shop-fisher.sheet.sell-all-fish": string;
    "dashboard.actions.seaport.shop-fisher.sheet.no-fish": string;
    "dashboard.actions.seaport.shop-fisher.sheet.sell-one": string;
    "dashboard.actions.seaport.shop-fisher.sheet.sell-all": string;
    "dashboard.actions.seaport.shop-fisher.sheet.toast.sell-one": string;
    "dashboard.actions.seaport.shop-fisher.sheet.toast.sell-all": string;
    "dashboard.actions.castle.explore.label": string;
    "dashboard.actions.castle.explore.description": string;
    "dashboard.actions.castle.explore.button-label": string;
    "dashboard.actions.village.shop-product.label": string;
    "dashboard.actions.village.shop-product.description": string;
    "dashboard.actions.village.shop-product.button-label": string;
    "dashboard.actions.village.farm.label": string;
    "dashboard.actions.village.farm.description": string;
    "dashboard.actions.village.farm.button-label": string;
    "dashboard.transit": string;
    "dashboard.transit.button": string;
    "dashboard.transit.title": string;
    "dashboard.transit.toast.success.title": string;
    "dashboard.transit.toast.success.description": string;
    "dashboard.transit.toast.no-currency.title": string;
    "dashboard.transit.toast.no-currency.description": string;
    "info.profile.username": string;
    "info.profile.email": string;
    "info.profile.about": string;
    "info.profile.about-placeholder": string;
    "info.profile.save": string;
    "info.inventory.currency": string;
    "info.inventory.currency.empty": string;
    "info.inventory.fish": string;
    "info.inventory.fish.empty": string;
    "info.inventory.product": string;
    "info.inventory.product.empty": string;
    "info.inventory.seed": string;
    "info.inventory.seed.empty": string;
    "info.inventory.crop": string;
    "info.inventory.crop.empty": string;
    "info.inventory.box": string;
    "info.inventory.box.empty": string;
    world: {
      rating: {
        "table.title": string;
        "table.user.name": string;
        "table.user.level": string;
        "table.user.xp": string;
      };
    };
  };
  location: {
    InTransit: string;
    Capital: string;
    Garden: string;
    Seaport: string;
    Castle: string;
    Village: string;
    ExploreGarden: string;
    ExploreCastle: string;
    Fishing: string;
    FieldWatering: string;
  };
};

type DictionaryState = {
  dictionary: Dictionary;
  setDictionary: (dictionary: Dictionary) => void;
};

export const useDictionaryStore = create<DictionaryState>((set) => ({
  dictionary: {
    sidebar: {
      "category.dashboard": "",
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
      "dashboard.about": "",
      "dashboard.actions": "",
      "dashboard.actions.capital.shop-seed.label": "",
      "dashboard.actions.capital.shop-seed.description": "",
      "dashboard.actions.capital.shop-seed.button-label": "",
      "dashboard.actions.capital.market.label": "",
      "dashboard.actions.capital.market.description": "",
      "dashboard.actions.capital.market.button-label": "",
      "dashboard.actions.capital.casino.label": "",
      "dashboard.actions.capital.casino.description": "",
      "dashboard.actions.capital.casino.button-label": "",
      "dashboard.actions.garden.shop-recipe.label": "",
      "dashboard.actions.garden.shop-recipe.description": "",
      "dashboard.actions.garden.shop-recipe.button-label": "",
      "dashboard.actions.garden.explore.label": "",
      "dashboard.actions.garden.explore.description": "",
      "dashboard.actions.garden.explore.button-label": "",
      "dashboard.actions.seaport.fishing.label": "",
      "dashboard.actions.seaport.fishing.description": "",
      "dashboard.actions.seaport.fishing.button-label": "",
      "dashboard.actions.seaport.fishing.toast.start": "",
      "dashboard.actions.seaport.fishing.toast.complete": "",
      "dashboard.actions.seaport.shop-fisher.label": "",
      "dashboard.actions.seaport.shop-fisher.description": "",
      "dashboard.actions.seaport.shop-fisher.button-label": "",
      "dashboard.actions.seaport.shop-fisher.sheet.close": "",
      "dashboard.actions.seaport.shop-fisher.sheet.sell-all-fish": "",
      "dashboard.actions.seaport.shop-fisher.sheet.no-fish": "",
      "dashboard.actions.seaport.shop-fisher.sheet.sell-one": "",
      "dashboard.actions.seaport.shop-fisher.sheet.sell-all": "",
      "dashboard.actions.seaport.shop-fisher.sheet.toast.sell-one": "",
      "dashboard.actions.seaport.shop-fisher.sheet.toast.sell-all": "",
      "dashboard.actions.castle.explore.label": "",
      "dashboard.actions.castle.explore.description": "",
      "dashboard.actions.castle.explore.button-label": "",
      "dashboard.actions.village.shop-product.label": "",
      "dashboard.actions.village.shop-product.description": "",
      "dashboard.actions.village.shop-product.button-label": "",
      "dashboard.actions.village.farm.label": "",
      "dashboard.actions.village.farm.description": "",
      "dashboard.actions.village.farm.button-label": "",
      "dashboard.transit": "",
      "dashboard.transit.title": "",
      "dashboard.transit.button": "",
      "dashboard.transit.toast.success.title": "",
      "dashboard.transit.toast.success.description": "",
      "dashboard.transit.toast.no-currency.title": "",
      "dashboard.transit.toast.no-currency.description": "",
      "info.profile.username": "",
      "info.profile.email": "",
      "info.profile.about": "",
      "info.profile.about-placeholder": "",
      "info.profile.save": "",
      "info.inventory.currency": "",
      "info.inventory.currency.empty": "",
      "info.inventory.fish": "",
      "info.inventory.fish.empty": "",
      "info.inventory.product": "",
      "info.inventory.product.empty": "",
      "info.inventory.seed": "",
      "info.inventory.seed.empty": "",
      "info.inventory.crop": "",
      "info.inventory.crop.empty": "",
      "info.inventory.box": "",
      "info.inventory.box.empty": "",
      world: {
        rating: {
          "table.title": "",
          "table.user.name": "",
          "table.user.level": "",
          "table.user.xp": "",
        },
      },
    },
    location: {
      InTransit: "",
      Capital: "",
      Garden: "",
      Seaport: "",
      Castle: "",
      Village: "",
      ExploreGarden: "",
      ExploreCastle: "",
      Fishing: "",
      FieldWatering: "",
    },
  },
  setDictionary: (dictionary: Dictionary) => set({ dictionary }),
}));
