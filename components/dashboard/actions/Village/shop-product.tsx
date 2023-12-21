import { useDictionaryStore } from "@/store/dictionary-store";
import DashboardActionBase from "../dashboard-action-base";
import { Button } from "@/components/ui/button";
import { useUserProductStore } from "@/store/user-product-store";
import { useUserCurrencyStore } from "@/store/user-currency-store";
import { useToast } from "@/components/ui/use-toast";
import { Currency, Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/data-access/product";
import formatString from "@/util/format-string";
import Image from "next/image";
import IenIcon from "@/public/currency/Ien.png";
import ShopProductItem from "./shop-product-item";
import ShopProductSkeleton from "./shop-product-skeleton";
import FullscreenSheet from "@/components/fullscreen-sheet";
import useUserCurrency from "@/hooks/use-user-currency";

const ActionVillageShopProduct = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const addProductToUser = useUserProductStore(
    (state) => state.addProductToUser,
  );
  const userCurrencies = useUserCurrencyStore((state) => state.userCurrencies);
  const removeCurrencyFromUser = useUserCurrencyStore(
    (state) => state.removeCurrencyFromUser,
  );
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    loadData();
  }, []);

  useUserCurrency();

  const handleBuyProduct = (product: Product) => {
    const userCurrency = userCurrencies.find(
      (currency) => currency.currency === Currency.Ien,
    );

    if (userCurrency === undefined || userCurrency.amount < product.price) {
      toast({
        description: formatString(
          dictionary.dashboard[
            "dashboard.actions.village.shop-product.sheet.toast.no-currency"
          ],
          <Image className="mx-1 inline h-6 w-6" src={IenIcon} alt="Ien" />,
          <Image
            className="mx-1 inline h-6 w-6"
            width={27}
            height={27}
            src={`/product/${product.name}.png`}
            alt={product.name}
          />,
          // @ts-ignore Implicit any
          dictionary.item.product[product.name],
        ),
      });
      return;
    }

    removeCurrencyFromUser(Currency.Ien, product.price);
    addProductToUser(product.id, 1);

    toast({
      description: formatString(
        dictionary.dashboard[
          "dashboard.actions.village.shop-product.sheet.toast.success"
        ],
        <Image
          className="mx-1 inline h-6 w-6"
          width={27}
          height={27}
          src={`/product/${product.name}.png`}
          alt={product.name}
        />,
        // @ts-ignore Implicit any
        dictionary.item.product[product.name],
        <Image className="mx-1 inline h-6 w-6" src={IenIcon} alt="Ien" />,
        product.price,
      ),
    });
  };

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
        <FullscreenSheet
          trigger={
            <Button className="mt-2 w-fit self-end" variant="secondary">
              {
                dictionary.dashboard[
                  "dashboard.actions.village.shop-product.button-label"
                ]
              }
            </Button>
          }
          title={
            dictionary.dashboard["dashboard.actions.village.shop-product.label"]
          }
          description={
            dictionary.dashboard[
              "dashboard.actions.village.shop-product.description"
            ]
          }
          content={
            <div className="flex flex-wrap gap-5">
              {products.length ? (
                products.map((product) => (
                  <ShopProductItem
                    key={product.id}
                    dictionary={dictionary}
                    product={product}
                    handleBuyProduct={handleBuyProduct}
                  />
                ))
              ) : (
                <ShopProductSkeleton />
              )}
            </div>
          }
        />
      }
    />
  );
};

export default ActionVillageShopProduct;
