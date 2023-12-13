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
import UseUserCurrency from "@/hooks/use-user-currency";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useUserCurrencyStore } from "@/store/user-currency-store";
import Image from "next/image";

export default function InventoryCurrency() {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const loading = useUserCurrencyStore((state) => state.loading);
  const userCurrencies = useUserCurrencyStore((state) => state.userCurrencies);

  UseUserCurrency();

  return (
    <>
      <TypographySmall>
        {dictionary.dashboard["user.inventory.currency"]}
      </TypographySmall>
      <div className="flex flex-wrap gap-5">
        {loading ? (
          <>
            <Skeleton className="h-[85px] flex-1" />
            <Skeleton className="h-[85px] flex-1" />
          </>
        ) : userCurrencies.length > 0 ? (
          userCurrencies.map((userCurrency) => (
            <TooltipProvider key={userCurrency.currency}>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex h-[85px] flex-col items-center justify-between gap-1 rounded-lg border p-2">
                    <Image
                      src={`/currency/${userCurrency.currency.toString()}.png`}
                      alt={userCurrency.currency.toString()}
                      width={36}
                      height={36}
                    />
                    {Number(userCurrency.amount)}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{userCurrency.currency}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))
        ) : (
          <div className="flex flex-col justify-center gap-1 rounded-lg border p-2">
            <TypographyMuted>
              {dictionary.dashboard["user.inventory.currency.empty"]}
            </TypographyMuted>
          </div>
        )}
      </div>
    </>
  );
}
