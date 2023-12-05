import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/store/user-store";
import { Location } from "@prisma/client";

export default function DashboardTransit() {
  const setUserLocation = useUserStore((state) => state.setUserLocation);

  return (
    <Card>
      <CardHeader>
        <CardTitle>In progress...</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-5">
        <Button onClick={() => setUserLocation(Location.Capital)}>
          Move to Capital
        </Button>
        <Button onClick={() => setUserLocation(Location.Garden)}>
          Move to Garden
        </Button>
        <Button onClick={() => setUserLocation(Location.Seaport)}>
          Move to Seaport
        </Button>
        <Button onClick={() => setUserLocation(Location.Castle)}>
          Move to Castle
        </Button>
        <Button onClick={() => setUserLocation(Location.Village)}>
          Move to Village
        </Button>
      </CardContent>
    </Card>
  );
}
