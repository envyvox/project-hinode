import { useDictionaryStore } from "@/store/dictionary-store";
import ActionBase from "../action-base";

export default function ActionGardenExpoloreGarden() {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <ActionBase
      label={dictionary.dashboard["dashboard.actions.garden.explore.label"]}
      description={
        dictionary.dashboard["dashboard.actions.garden.explore.description"]
      }
      buttonLabel={
        dictionary.dashboard["dashboard.actions.garden.explore.button-label"]
      }
      onClick={() => {}}
    />
  );
}
