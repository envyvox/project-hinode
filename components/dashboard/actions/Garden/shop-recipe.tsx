import { useDictionaryStore } from "@/store/dictionary-store";

import { Button } from "@/components/ui/button";

import DashboardActionBase from "../dashboard-action-base";

const ActionGardenShopRecipe = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <DashboardActionBase
      label={dictionary.dashboard["actions.garden.shop-recipe.label"]}
      description={
        dictionary.dashboard["actions.garden.shop-recipe.description"]
      }
      actionComponent={
        <Button
          className="mt-2 w-fit self-end"
          variant="secondary"
          onClick={() => {}}
        >
          {dictionary.dashboard["actions.garden.shop-recipe.button-label"]}
        </Button>
      }
    />
  );
};

export default ActionGardenShopRecipe;
