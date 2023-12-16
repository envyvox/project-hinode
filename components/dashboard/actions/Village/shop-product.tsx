import { useDictionaryStore } from "@/store/dictionary-store";
import DashboardActionBase from "../dashboard-action-base";
import { Button } from "@/components/ui/button";

const ActionVillageShopProduct = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <DashboardActionBase
      label={
        dictionary.dashboard["dashboard.actions.village.shop-product.label"]
      }
      description={
        dictionary.dashboard[
          "dashboard.actions.village.shop-product.description"
        ]
      }
      actionComponent={
        <Button
          className="mt-2 w-fit self-end"
          variant="secondary"
          onClick={() => {}}
        >
          {
            dictionary.dashboard[
              "dashboard.actions.village.shop-product.button-label"
            ]
          }
        </Button>
      }
    />
  );
};

export default ActionVillageShopProduct;
