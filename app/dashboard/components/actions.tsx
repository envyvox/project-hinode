import { TypographyH4 } from "@/components/typography/h4";
import { TypographyP } from "@/components/typography/p";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/store/user-store";
import { locationActions } from "./location-actions";
import Image from "next/image";

export default function DashboardActions() {
  const userLocation = useUserStore((state) => state.user.location);
  const actions = locationActions[userLocation];

  return (
    <Card>
      <CardHeader>
        <CardTitle>In progress...</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {actions.map((action) => (
          <div id={action.label} className="flex flex-wrap gap-5 border-t pt-5">
            <Image
              className="h-[200px] w-[200px] rounded-xl object-cover"
              src={`/location/action/${action.image}.png`}
              width={1100}
              height={150}
              alt={action.image}
            />
            <div className="flex flex-1 flex-col">
              <TypographyH4>{action.label}</TypographyH4>
              <TypographyP>{action.description}</TypographyP>
              <Button
                className="mt-2 w-fit self-end"
                variant="secondary"
                onClick={() => action.handler}
              >
                {action.buttonLabel}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
