import { useDictionaryStore } from "@/store/dictionary-store";
import DashboardActionBase from "../dashboard-action-base";
import { Button } from "@/components/ui/button";
import FullscreenSheet from "@/components/fullscreen-sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CasinoLottery from "./casino-lottery";
import CasinoBets from "./casino-bets";

const ActionCapitalCasino = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <DashboardActionBase
      label={dictionary.dashboard["dashboard.actions.capital.casino.label"]}
      description={
        dictionary.dashboard["dashboard.actions.capital.casino.description"]
      }
      actionComponent={
        <FullscreenSheet
          trigger={
            <Button
              className="mt-2 w-fit self-end"
              variant="secondary"
              onClick={() => {}}
            >
              {
                dictionary.dashboard[
                  "dashboard.actions.capital.casino.button-label"
                ]
              }
            </Button>
          }
          title={dictionary.dashboard["dashboard.actions.capital.casino.label"]}
          description={
            dictionary.dashboard["dashboard.actions.capital.casino.description"]
          }
          content={
            <div className="grid grid-cols-2 gap-5">
              <CasinoLottery />
              <CasinoBets />
              <Card>
                <CardHeader>
                  <CardTitle>Скоро...</CardTitle>
                  <CardDescription>
                    Тут обязательно что-то появится...
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-[130px]" />
                </CardContent>
              </Card>
            </div>
          }
        />
      }
    />
  );
};

export default ActionCapitalCasino;
