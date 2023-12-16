import { useDictionaryStore } from "@/store/dictionary-store";
import DashboardActionBase from "../dashboard-action-base";
import { Button } from "@/components/ui/button";

const ActionGardenShopRecipe = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <DashboardActionBase
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
};

export default ActionGardenShopRecipe;
