import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/store/user-store";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { Location } from "@prisma/client";
import { getSeeds } from "@/services/data-access/seed";

type LocationActions = {
  [key in Location]: string[];
};

const locationActions: LocationActions = {
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

const renderAction = (
  userLocation: Location,
  action: string,
): React.ReactElement => {
  const element = dynamic(() => import(`./actions/${userLocation}/${action}`), {
    loading: () => <Skeleton className="h-[210px] w-full" />,
  });

  return React.createElement(element);
};

const DashboardActions = () => {
  const user = useUserStore((state) => state.user);
  const actions = locationActions[user.location];

  // TODO: remove
  const remove = getSeeds();

  return (
    <Card>
      <CardHeader>
        <CardTitle>In progress...</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {actions.map((action) => (
          <div key={action} className="flex flex-wrap gap-5 border-t pt-5">
            {renderAction(user.location, action)}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DashboardActions;
