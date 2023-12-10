import { useDictionaryStore } from "@/store/dictionary-store";
import ActionBase from "../action-base";

export default function ActionGardenShopRecipe() {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <ActionBase
      label={dictionary.dashboard["dashboard.actions.garden.shop-recipe.label"]}
      description={
        dictionary.dashboard["dashboard.actions.garden.shop-recipe.description"]
      }
      buttonLabel={
        dictionary.dashboard[
          "dashboard.actions.garden.shop-recipe.button-label"
        ]
      }
      onClick={() => {}}
    />
  );
}
