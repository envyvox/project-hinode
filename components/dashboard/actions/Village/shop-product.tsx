import { useDictionaryStore } from "@/store/dictionary-store";
import DashboardActionBase from "../dashboard-action-base";
import { Button } from "@/components/ui/button";
import { useUserProductStore } from "@/store/user-product-store";
import { useUserCurrencyStore } from "@/store/user-currency-store";
import UseUserCurrency from "@/hooks/use-user-currency";
import { useToast } from "@/components/ui/use-toast";
import { Currency, Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/data-access/product";
import formatString from "@/util/format-string";
import Image from "next/image";
import IenIcon from "@/public/currency/Ien.png";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShopProductItem from "./shop-product-item";
import ShopProductSkeleton from "./shop-product-skeleton";

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

  UseUserCurrency();

  useEffect(() => {
    getProducts().then((products) => setProducts(products));
  }, []);

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
          product.name,
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
        product.name,
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
        <Sheet>
          <SheetTrigger asChild>
            <Button className="mt-2 w-fit self-end" variant="secondary">
              {
                dictionary.dashboard[
                  "dashboard.actions.capital.shop-seed.button-label"
                ]
              }
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-full">
            <div className="container flex flex-col gap-5">
              <SheetHeader>
                <SheetTitle>
                  {
                    dictionary.dashboard[
                      "dashboard.actions.capital.shop-seed.label"
                    ]
                  }
                </SheetTitle>
                <SheetDescription>
                  {
                    dictionary.dashboard[
                      "dashboard.actions.capital.shop-seed.description"
                    ]
                  }
                </SheetDescription>
              </SheetHeader>
              <ScrollArea className="h-[85vh]">
                <div className="grid grid-flow-dense grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>
      }
    />
  );
};

export default ActionVillageShopProduct;
