"use client";

import { TypographyMuted } from "@/components/typography/muted";
import { TypographySmall } from "@/components/typography/small";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserCurrencies } from "@/lib/game/currency";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserStore } from "@/store/user-store";
import { UserCurrency } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function InventoryCurrency() {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const user = useUserStore((state) => state.user);
  const [userCurrencies, setUserCurrencies] = useState<UserCurrency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (user.id !== "") {
      getUserCurrencies(user.id).then((userCurrencies) => {
        setUserCurrencies(userCurrencies);
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <>
      <TypographySmall>
        {dictionary.dashboard["info.inventory.currency"]}
      </TypographySmall>
      <div className="flex flex-wrap gap-5">
        {loading ? (
          <>
            <Skeleton className="h-[85px] flex-1" />
            <Skeleton className="h-[85px] flex-1" />
          </>
        ) : userCurrencies.length > 0 ? (
          userCurrencies.map((userCurrency) => (
            <div
              key={userCurrency.currency}
              className="flex h-[85px] flex-col items-center justify-between gap-1 rounded-lg border p-2"
            >
              <Image
                src={`/currency/${userCurrency.currency.toString()}.png`}
                alt={userCurrency.currency.toString()}
                width={36}
                height={36}
              />
              {Number(userCurrency.amount)}
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center gap-1 rounded-lg border p-2">
            <TypographyMuted>
              {dictionary.dashboard["info.inventory.currency.empty"]}
            </TypographyMuted>
          </div>
        )}
      </div>
    </>
  );
}
