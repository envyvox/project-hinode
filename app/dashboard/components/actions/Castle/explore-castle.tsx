import { useDictionaryStore } from "@/store/dictionary-store";
import ActionBase from "../action-base";

export default function ActionCastleExploreCastle() {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <ActionBase
      label={dictionary.dashboard["dashboard.actions.castle.explore.label"]}
      description={
        dictionary.dashboard["dashboard.actions.castle.explore.description"]
      }
      buttonLabel={
        dictionary.dashboard["dashboard.actions.castle.explore.button-label"]
      }
      onClick={() => {}}
    />
  );
}
