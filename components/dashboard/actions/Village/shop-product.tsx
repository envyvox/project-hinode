import { useDictionaryStore } from "@/store/dictionary-store";

import { useProductsQuery } from "@/hooks/queries/use-products-query";
import { Button } from "@/components/ui/button";
import FullscreenSheet from "@/components/fullscreen-sheet";

import DashboardActionBase from "../dashboard-action-base";
import ShopProductItem from "./shop-product-item";
import ShopProductSkeleton from "./shop-product-skeleton";

const ActionVillageShopProduct = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: products, isLoading } = useProductsQuery();

  return (
    <DashboardActionBase
      label={dictionary.dashboard["actions.village.shop-product.label"]}
      description={
        dictionary.dashboard["actions.village.shop-product.description"]
      }
      actionComponent={
        <FullscreenSheet
          trigger={
            <Button className="mt-2 w-fit self-end" variant="secondary">
              {
                dictionary.dashboard[
                  "actions.village.shop-product.button-label"
                ]
              }
            </Button>
          }
          title={dictionary.dashboard["actions.village.shop-product.label"]}
          description={
            dictionary.dashboard["actions.village.shop-product.description"]
          }
          content={
            <div className="flex flex-wrap gap-5">
              {isLoading ? (
                <ShopProductSkeleton />
              ) : (
                products?.map((product) => (
                  <ShopProductItem key={product.id} product={product} />
                ))
              )}
            </div>
          }
        />
      }
    />
  );
};

export default ActionVillageShopProduct;
