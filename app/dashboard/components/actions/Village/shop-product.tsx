import { useDictionaryStore } from "@/store/dictionary-store";
import ActionBase from "../action-base";

export default function ActionVillageShopProduct() {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <ActionBase
      label={
        dictionary.dashboard["dashboard.actions.village.shop-product.label"]
      }
      description={
        dictionary.dashboard[
          "dashboard.actions.village.shop-product.description"
        ]
      }
      buttonLabel={
        dictionary.dashboard[
          "dashboard.actions.village.shop-product.button-label"
        ]
      }
      onClick={() => {}}
    />
  );
}
