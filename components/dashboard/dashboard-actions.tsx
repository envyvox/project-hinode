import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/store/user-store";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { Location } from "@prisma/client";

type LocationActions = {
  [location in Location]: {
    [key: string]: React.ComponentType<{}>;
  };
};

type LocationActionKeys = {
  [key in Location]: string[];
};

const locationActionKeys: LocationActionKeys = {
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

const DynamicDashboardAction = ({
  userLocation,
  action,
}: {
  userLocation: Location;
  action: string;
}) => {
  const DynamicComponent = actions[userLocation][action];
  return <DynamicComponent />;
};

const DashboardActions = () => {
  const userLocation = useUserStore((state) => state.user).location;

  return (
    <Card>
      <CardHeader>
        <CardTitle>In progress...</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {locationActionKeys[userLocation].map((action) => (
          <div key={action} className="flex flex-wrap gap-5 border-t pt-5">
            <DynamicDashboardAction
              userLocation={userLocation}
              action={action}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DashboardActions;
