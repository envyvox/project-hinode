import dynamic from "next/dynamic";
import { Location } from "@prisma/client";

import DashboardActionSkeleton from "./dashboard-action-skeleton";

type LocationActions = {
  [location in Location]: {
    [key: string]: React.ComponentType<{}>;
  };
};

type LocationActionKeys = {
  [key in Location]: string[];
};

export const locationActionKeys: LocationActionKeys = {
  InTransit: [],
  Capital: ["shop-seed", "market", "casino"],
  Garden: ["shop-recipe", "explore-garden"],
  Seaport: ["fishing", "shop-fisher"],
  Castle: ["explore-castle"],
  Village: ["shop-product", "farm"],
  ExploreGarden: [],
  ExploreCastle: [],
  Fishing: [],
  FieldWatering: [],
  WorkOnContract: [],
};

const actions: LocationActions = {
  [Location.Capital]: {
    "shop-seed": dynamic(() => import("./actions/Capital/shop-seed"), {
      loading: DashboardActionSkeleton,
    }),
    market: dynamic(() => import("./actions/Capital/market"), {
      loading: DashboardActionSkeleton,
    }),
    casino: dynamic(() => import("./actions/Capital/casino"), {
      loading: DashboardActionSkeleton,
    }),
  },
  [Location.Garden]: {
    "shop-recipe": dynamic(() => import("./actions/Garden/shop-recipe"), {
      loading: DashboardActionSkeleton,
    }),
    "explore-garden": dynamic(() => import("./actions/Garden/explore-garden"), {
      loading: DashboardActionSkeleton,
    }),
  },
  [Location.Seaport]: {
    fishing: dynamic(() => import("./actions/Seaport/fishing"), {
      loading: DashboardActionSkeleton,
    }),
    "shop-fisher": dynamic(() => import("./actions/Seaport/shop-fisher"), {
      loading: DashboardActionSkeleton,
    }),
  },
  [Location.Castle]: {
    "explore-castle": dynamic(() => import("./actions/Castle/explore-castle"), {
      loading: DashboardActionSkeleton,
    }),
  },
  [Location.Village]: {
    "shop-product": dynamic(() => import("./actions/Village/shop-product"), {
      loading: DashboardActionSkeleton,
    }),
    farm: dynamic(() => import("./actions/Village/farm"), {
      loading: DashboardActionSkeleton,
    }),
  },
  InTransit: {},
  ExploreGarden: {},
  ExploreCastle: {},
  Fishing: {},
  FieldWatering: {},
  WorkOnContract: {},
};

type Props = {
  userLocation: Location;
  action: string;
};

const DynamicDashboardAction = ({ userLocation, action }: Props) => {
  const DynamicComponent = actions[userLocation][action];
  return <DynamicComponent />;
};

export default DynamicDashboardAction;
