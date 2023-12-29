import { useUserStore } from "@/store/user-store";

import { useWorkContractsQuery } from "@/hooks/queries/use-work-contracts-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "../ui/button";
import DashboardActionBase from "./actions/dashboard-action-base";
import DashboardActionSkeleton from "./dashboard-action-skeleton";
import DynamicDashboardAction, {
  locationActionKeys,
} from "./dynamic-dashboard-action";

const DashboardActions = () => {
  const userLocation = useUserStore((state) => state.user).location;
  const { data: workContracts, isLoading: isContractsLoading } =
    useWorkContractsQuery(userLocation);

  return (
    <Card>
      <CardHeader>
        <CardTitle>In progress...</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {locationActionKeys[userLocation].map((action) => (
          <DynamicDashboardAction
            key={action}
            userLocation={userLocation}
            action={action}
          />
        ))}
        {isContractsLoading && (
          <>
            <DashboardActionSkeleton />
            <DashboardActionSkeleton />
            <DashboardActionSkeleton />
          </>
        )}
        {workContracts?.map((workContract) => (
          <DashboardActionBase
            key={workContract.id}
            label={workContract.name}
            description={workContract.description}
            actionComponent={
              <Button className="mt-2 w-fit self-end" variant="secondary">
                Работать
              </Button>
            }
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default DashboardActions;
