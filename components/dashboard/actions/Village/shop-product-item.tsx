import TypographyLarge from "@/components/typography/large";
import TypographySmall from "@/components/typography/small";
import { useDictionaryStore } from "@/store/dictionary-store";
import formatString from "@/util/format-string";
import { Product } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { IconIen } from "@/components/icons";
import { Button } from "@/components/ui/button";

type Props = {
  product: Product;
  handleBuyProduct: (product: Product) => void;
};

const ShopProductItem = ({ product, handleBuyProduct }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);

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
              dictionary.dashboard[
                "dashboard.actions.village.shop-product.sheet.price"
              ],
              product.price,
              <IconIen />,
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
            "dashboard.actions.village.shop-product.sheet.button-label"
          ]
        }
      </Button>
    </div>
  );
};

export default ShopProductItem;
