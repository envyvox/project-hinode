import { useDictionaryStore } from "@/store/dictionary-store";
import ActionBase from "../action-base";

export default function ActionCapitalMarket() {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <ActionBase
      label={dictionary.dashboard["dashboard.actions.capital.market.label"]}
      description={
        dictionary.dashboard["dashboard.actions.capital.market.description"]
      }
      buttonLabel={
        dictionary.dashboard["dashboard.actions.capital.market.button-label"]
      }
      onClick={() => {}}
    />
  );
}
