import { useDictionaryStore } from "@/store/dictionary-store";
import ActionBase from "../action-base";
import { Button } from "@/components/ui/button";

export default function ActionGardenShopRecipe() {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <ActionBase
      label={dictionary.dashboard["dashboard.actions.garden.shop-recipe.label"]}
      description={
        dictionary.dashboard["dashboard.actions.garden.shop-recipe.description"]
      }
      actionComponent={
        <Button
          className="mt-2 w-fit self-end"
          variant="secondary"
          onClick={() => {}}
        >
          {
            dictionary.dashboard[
              "dashboard.actions.garden.shop-recipe.button-label"
            ]
          }
        </Button>
      }
    />
  );
}
