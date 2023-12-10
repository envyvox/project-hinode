import { useDictionaryStore } from "@/store/dictionary-store";
import ActionBase from "../action-base";

export default function ActionCapitalShopSeed() {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <ActionBase
      label={dictionary.dashboard["dashboard.actions.capital.shop-seed.label"]}
      description={
        dictionary.dashboard["dashboard.actions.capital.shop-seed.description"]
      }
      buttonLabel={
        dictionary.dashboard["dashboard.actions.capital.shop-seed.button-label"]
      }
      onClick={() => {}}
    />
  );
}
