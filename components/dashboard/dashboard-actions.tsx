import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/store/user-store";
import React from "react";
import DynamicDashboardAction, {
  locationActionKeys,
} from "./dynamic-dashboard-action";

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
