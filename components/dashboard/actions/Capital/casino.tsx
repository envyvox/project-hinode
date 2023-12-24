import { useDictionaryStore } from "@/store/dictionary-store";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import FullscreenSheet from "@/components/fullscreen-sheet";

import DashboardActionBase from "../dashboard-action-base";
import CasinoBets from "./casino-bets";
import CasinoLottery from "./casino-lottery";

const ActionCapitalCasino = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <DashboardActionBase
      label={dictionary.dashboard["actions.capital.casino.label"]}
      description={dictionary.dashboard["actions.capital.casino.description"]}
      actionComponent={
        <FullscreenSheet
          trigger={
            <Button
              className="mt-2 w-fit self-end"
              variant="secondary"
              onClick={() => {}}
            >
              {dictionary.dashboard["actions.capital.casino.button-label"]}
            </Button>
          }
          title={dictionary.dashboard["actions.capital.casino.label"]}
          description={
            dictionary.dashboard["actions.capital.casino.description"]
          }
          content={
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
