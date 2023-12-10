import { useDictionaryStore } from "@/store/dictionary-store";
import ActionBase from "../action-base";

export default function ActionVillageFarm() {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <ActionBase
      label={dictionary.dashboard["dashboard.actions.village.farm.label"]}
      description={
        dictionary.dashboard["dashboard.actions.village.farm.description"]
      }
      buttonLabel={
        dictionary.dashboard["dashboard.actions.village.farm.button-label"]
      }
      onClick={() => {}}
    />
  );
}
