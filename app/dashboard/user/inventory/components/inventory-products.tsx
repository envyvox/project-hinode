"use client";

import { TypographyMuted } from "@/components/typography/muted";
import { TypographySmall } from "@/components/typography/small";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UseUserProduct from "@/hooks/use-user-product";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserProductStore } from "@/store/user-product-store";
import Image from "next/image";

export default function InventoryProducts() {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const loading = useUserProductStore((state) => state.loading);
  const userProducts = useUserProductStore((state) => state.userProducts);

  UseUserProduct();

  return (
    <>
      <TypographySmall>
        {dictionary.dashboard["user.inventory.product"]}
      </TypographySmall>
      <div className="flex flex-wrap gap-5">
        {loading ? (
          <>
            <Skeleton className="h-[85px] flex-1" />
            <Skeleton className="h-[85px] flex-1" />
          </>
        ) : userProducts.length ? (
          userProducts.map((userProduct) => (
            <TooltipProvider key={userProduct.productId}>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex h-[85px] flex-col items-center justify-between gap-1 rounded-lg border bg-card p-2 text-card-foreground shadow-sm">
                    <Image
                      src={`/product/${userProduct.product.name}.png`}
                      alt={userProduct.product.name}
                      width={36}
                      height={36}
                    />
                    {Number(userProduct.amount)}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{userProduct.product.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))
        ) : (
          <div className="flex flex-col justify-center gap-1 rounded-lg border p-2">
            <TypographyMuted>
              {dictionary.dashboard["user.inventory.product.empty"]}
            </TypographyMuted>
          </div>
        )}
      </div>
    </>
  );
}
