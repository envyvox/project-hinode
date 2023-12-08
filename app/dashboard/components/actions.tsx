import { TypographyH4 } from "@/components/typography/h4";
import { TypographyP } from "@/components/typography/p";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/store/user-store";
import { locationActions } from "./location-actions";
import { useDictionaryStore } from "@/store/dictionary-store";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardActions() {
  const dictionary = useDictionaryStore((state) => state.dictionary);
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
            {/* TODO: Replace skeleton with Image */}
            <Skeleton className="h-[200px] w-[200px]" />
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <TypographyH4>
                  {/* @ts-ignore Implicit any */}
                  {dictionary.dashboard[action.label]}
                </TypographyH4>
                <TypographyP>
                  {/* @ts-ignore Implicit any */}
                  {dictionary.dashboard[action.description]}
                </TypographyP>
              </div>
              <Button
                className="mt-2 w-fit self-end"
                variant="secondary"
                onClick={() => action.handler}
              >
                {/* @ts-ignore Implicit any */}
                {dictionary.dashboard[action.buttonLabel]}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
