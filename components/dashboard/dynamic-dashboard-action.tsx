import { Location } from "@prisma/client";
import { Skeleton } from "../ui/skeleton";
import dynamic from "next/dynamic";

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

const actionsLoading = () => <Skeleton className="h-[210px] w-full" />;

const actions: LocationActions = {
  [Location.Capital]: {
    "shop-seed": dynamic(() => import("./actions/Capital/shop-seed"), {
      loading: actionsLoading,
    }),
    market: dynamic(() => import("./actions/Capital/market"), {
      loading: actionsLoading,
    }),
    casino: dynamic(() => import("./actions/Capital/casino"), {
      loading: actionsLoading,
    }),
  },
  [Location.Garden]: {
    "shop-recipe": dynamic(() => import("./actions/Garden/shop-recipe"), {
      loading: actionsLoading,
    }),
    "explore-garden": dynamic(() => import("./actions/Garden/explore-garden"), {
      loading: actionsLoading,
    }),
  },
  [Location.Seaport]: {
    fishing: dynamic(() => import("./actions/Seaport/fishing"), {
      loading: actionsLoading,
    }),
    "shop-fisher": dynamic(() => import("./actions/Seaport/shop-fisher"), {
      loading: actionsLoading,
    }),
  },
  [Location.Castle]: {
    "explore-castle": dynamic(() => import("./actions/Castle/explore-castle"), {
      loading: actionsLoading,
    }),
  },
  [Location.Village]: {
    "shop-product": dynamic(() => import("./actions/Village/shop-product"), {
      loading: actionsLoading,
    }),
    farm: dynamic(() => import("./actions/Village/farm"), {
      loading: actionsLoading,
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
