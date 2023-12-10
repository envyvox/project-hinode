import { useDictionaryStore } from "@/store/dictionary-store";
import ActionBase from "../action-base";

export default function ActionCapitalCasino() {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <ActionBase
      label={dictionary.dashboard["dashboard.actions.capital.casino.label"]}
      description={
        dictionary.dashboard["dashboard.actions.capital.casino.description"]
      }
      buttonLabel={
        dictionary.dashboard["dashboard.actions.capital.casino.button-label"]
      }
      onClick={() => {}}
    />
  );
}
