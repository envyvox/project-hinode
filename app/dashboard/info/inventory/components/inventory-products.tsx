"use client";

import { TypographyMuted } from "@/components/typography/muted";
import { TypographySmall } from "@/components/typography/small";
import { Skeleton } from "@/components/ui/skeleton";
import { UserWithProduct, getUserProducts } from "@/lib/game/product";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserStore } from "@/store/user-store";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function InventoryProducts() {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const user = useUserStore((state) => state.user);
  const [userProducts, setUserProducts] = useState<UserWithProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (user.id !== "") {
      getUserProducts(user.id).then((userProducts) => {
        setUserProducts(userProducts);
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <>
      <TypographySmall>
        {dictionary.dashboard["info.inventory.product"]}
      </TypographySmall>
      <div className="flex flex-wrap gap-5">
        {loading ? (
          <>
            <Skeleton className="h-[85px] flex-1" />
            <Skeleton className="h-[85px] flex-1" />
          </>
        ) : userProducts.length > 0 ? (
          userProducts.map((userProduct) => (
            <div
              key={userProduct.productId}
              className="flex h-[85px] flex-col items-center justify-between gap-1 rounded-lg border p-2"
            >
              <Image
                src={`/product/${userProduct.product.name}.png`}
                alt={userProduct.product.name}
                width={36}
                height={36}
              />
              {Number(userProduct.amount)}
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center gap-1 rounded-lg border p-2">
            <TypographyMuted>
              {dictionary.dashboard["info.inventory.product.empty"]}
            </TypographyMuted>
          </div>
        )}
      </div>
    </>
  );
}
