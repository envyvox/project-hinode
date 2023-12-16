import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/store/user-store";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import { Location, Seed } from "@prisma/client";
import { getSeeds } from "@/data-access/seed";

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

export default function DashboardActions() {
  const user = useUserStore((state) => state.user);
  const actions = locationActions[user.location];
  const [seeds, setSeeds] = useState<Seed[]>([]);

  // TODO: remove
  useEffect(() => {
    getSeeds().then((seeds) => {
      setSeeds(seeds);
    });
  }, [setSeeds]);

  const renderAction = (action: string) => {
    const element = dynamic(
      () => import(`./actions/${user.location}/${action}`),
      {
        loading: () => <Skeleton className="h-[210px] w-full" />,
      },
    );

    return React.createElement(element);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>In progress...</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {actions.map((action) => (
          <div key={action} className="flex flex-wrap gap-5 border-t pt-5">
            {renderAction(action)}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
