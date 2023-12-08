import { Location } from "@prisma/client";

type LocationAction = {
  image: string;
  label: string;
  description: string;
  buttonLabel: string;
  handler: () => void;
};

type LocationActions = {
  [key in Location]: LocationAction[];
};

export const locationActions: LocationActions = {
  Capital: [
    {
      image: "ShopSeed",
      label: "dashboard.actions.capital.shop-seed.label",
      description: "dashboard.actions.capital.shop-seed.description",
      buttonLabel: "dashboard.actions.capital.shop-seed.button-label",
      handler: () => {},
    },
    {
      image: "Market",
      label: "dashboard.actions.capital.market.label",
      description: "dashboard.actions.capital.market.description",
      buttonLabel: "dashboard.actions.capital.market.button-label",
      handler: () => {},
    },
    {
      image: "Casino",
      label: "dashboard.actions.capital.casino.label",
      description: "dashboard.actions.capital.casino.description",
      buttonLabel: "dashboard.actions.capital.casino.button-label",
      handler: () => {},
    },
  ],
  Garden: [
    {
      image: "ShopRecipe",
      label: "dashboard.actions.garden.shop-recipe.label",
      description: "dashboard.actions.garden.shop-recipe.description",
      buttonLabel: "dashboard.actions.garden.shop-recipe.button-label",
      handler: () => {},
    },
    {
      image: "ExploreGarden",
      label: "dashboard.actions.garden.explore.label",
      description: "dashboard.actions.garden.explore.description",
      buttonLabel: "dashboard.actions.garden.explore.button-label",
      handler: () => {},
    },
  ],
  Seaport: [
    {
      image: "Fishing",
      label: "dashboard.actions.seaport.fishing.label",
      description: "dashboard.actions.seaport.fishing.description",
      buttonLabel: "dashboard.actions.seaport.fishing.button-label",
      handler: () => {},
    },
    {
      image: "ShopFisher",
      label: "dashboard.actions.seaport.shop-fisher.label",
      description: "dashboard.actions.seaport.shop-fisher.description",
      buttonLabel: "dashboard.actions.seaport.shop-fisher.button-label",
      handler: () => {},
    },
  ],
  Castle: [
    {
      image: "ExploreCastle",
      label: "dashboard.actions.castle.explore.label",
      description: "dashboard.actions.castle.explore.description",
      buttonLabel: "dashboard.actions.castle.explore.button-label",
      handler: () => {},
    },
  ],
  Village: [
    {
      image: "ShopProduct",
      label: "dashboard.actions.village.shop-product.label",
      description: "dashboard.actions.village.shop-product.description",
      buttonLabel: "dashboard.actions.village.shop-product.button-label",
      handler: () => {},
    },
    {
      image: "Farm",
      label: "dashboard.actions.village.farm.label",
      description: "dashboard.actions.village.farm.description",
      buttonLabel: "dashboard.actions.village.farm.button-label",
      handler: () => {},
    },
  ],
  InTransit: [],
  ExploreGarden: [],
  ExploreCastle: [],
  Fishing: [],
  FieldWatering: [],
  WorkOnContract: [],
};
