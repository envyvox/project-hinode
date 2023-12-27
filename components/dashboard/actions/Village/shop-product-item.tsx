import Image from "next/image";
import { useDictionaryStore } from "@/store/dictionary-store";
import formatString from "@/util/format-string";
import { Currency, Product } from "@prisma/client";
import { toast } from "sonner";

import { useAddUserProductMutation } from "@/hooks/mutations/use-add-user-product-mutation";
import { useRemoveUserCurrencyMutation } from "@/hooks/mutations/use-remove-user-currency-mutation";
import { useUserCurrencyQuery } from "@/hooks/queries/use-user-currency-query";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import TypographyLarge from "@/components/typography/large";
import TypographySmall from "@/components/typography/small";

type Props = {
  product: Product;
};

const ShopProductItem = ({ product }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: userCurrency } = useUserCurrencyQuery(Currency.Ien);
  const { mutate: addProductToUser } = useAddUserProductMutation();
  const { mutate: removeCurrencyFromUser } = useRemoveUserCurrencyMutation();

  const handleBuyProduct = (product: Product) => {
    if (userCurrency === undefined || userCurrency.amount < product.price) {
      toast.success(
        formatString(
          dictionary.dashboard[
            "actions.village.shop-product.sheet.toast.no-currency"
          ],
          <Icons.Ien />,
          <Image
            className="mx-1 inline h-6 w-6"
            width={27}
            height={27}
            src={`/product/${product.name}.png`}
            alt={product.name}
          />,
          // @ts-ignore Implicit any
          dictionary.item.product[product.name]
        )
      );
      return;
    }

    removeCurrencyFromUser({ currency: Currency.Ien, amount: product.price });
    addProductToUser({ productId: product.id, amount: 1 });

    toast.success(
      formatString(
        dictionary.dashboard[
          "actions.village.shop-product.sheet.toast.success"
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
        <Icons.Ien />,
        product.price
      )
    );
  };

  return (
    <div className="flex flex-col gap-5 rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
      <div className="flex gap-5">
        <Image
          className="h-12 w-12"
          width={54}
          height={54}
          src={`/product/${product.name}.png`}
          alt={product.name}
        />
        <div className="flex flex-col">
          <TypographyLarge>
            {/* @ts-ignore Implicit any */}
            {dictionary.item.product[product.name]}
          </TypographyLarge>
          <TypographySmall>
            {formatString(
              dictionary.dashboard["actions.village.shop-product.sheet.price"],
              product.price,
              <Icons.Ien />
            )}
          </TypographySmall>
        </div>
      </div>
      <Button
        className="w-fit self-end"
        variant="outline"
        onClick={() => handleBuyProduct(product)}
      >
        {
          dictionary.dashboard[
            "actions.village.shop-product.sheet.button-label"
          ]
        }
      </Button>
    </div>
  );
};

export default ShopProductItem;
