import { useDictionaryStore } from "@/store/dictionary-store";
import ActionBase from "../action-base";
import { Button } from "@/components/ui/button";

export default function ActionCastleExploreCastle() {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <ActionBase
      label={dictionary.dashboard["dashboard.actions.castle.explore.label"]}
      description={
        dictionary.dashboard["dashboard.actions.castle.explore.description"]
      }
      actionComponent={
        <Button
          className="mt-2 w-fit self-end"
          variant="secondary"
          onClick={() => {}}
        >
          {
            dictionary.dashboard[
              "dashboard.actions.castle.explore.button-label"
            ]
          }
        </Button>
      }
    />
  );
}
