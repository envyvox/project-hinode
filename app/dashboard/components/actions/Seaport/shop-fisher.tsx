import { useDictionaryStore } from "@/store/dictionary-store";
import ActionBase from "../action-base";

export default function ActionSeaportShopFisher() {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <ActionBase
      label={
        dictionary.dashboard["dashboard.actions.seaport.shop-fisher.label"]
      }
      description={
        dictionary.dashboard[
          "dashboard.actions.seaport.shop-fisher.description"
        ]
      }
      buttonLabel={
        dictionary.dashboard[
          "dashboard.actions.seaport.shop-fisher.button-label"
        ]
      }
      onClick={() => {}}
    />
  );
}
