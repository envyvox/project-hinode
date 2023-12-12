import { useDictionaryStore } from "@/store/dictionary-store";
import ActionBase from "../action-base";
import { Button } from "@/components/ui/button";

export default function ActionCapitalCasino() {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <ActionBase
      label={dictionary.dashboard["dashboard.actions.capital.casino.label"]}
      description={
        dictionary.dashboard["dashboard.actions.capital.casino.description"]
      }
      actionComponent={
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
    />
  );
}
