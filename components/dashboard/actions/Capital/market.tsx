import { useDictionaryStore } from "@/store/dictionary-store";
import DashboardActionBase from "../dashboard-action-base";
import { Button } from "@/components/ui/button";

const ActionCapitalMarket = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <DashboardActionBase
      label={dictionary.dashboard["dashboard.actions.capital.market.label"]}
      description={
        dictionary.dashboard["dashboard.actions.capital.market.description"]
      }
      actionComponent={
        <Button
          className="mt-2 w-fit self-end"
          variant="secondary"
          onClick={() => {}}
        >
          {
            dictionary.dashboard[
              "dashboard.actions.capital.market.button-label"
            ]
          }
        </Button>
      }
    />
  );
};

export default ActionCapitalMarket;
