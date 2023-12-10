import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getTransitsFromLocation } from "@/data-access/transit";
import { useUserStore } from "@/store/user-store";
import { Currency, Transit } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import IenIcon from "@/public/currency/Ien.png";
import { useDictionaryStore } from "@/store/dictionary-store";
import { formatString } from "@/lib/format-string";
import { TypographyH4 } from "@/components/typography/h4";
import { TypographyP } from "@/components/typography/p";
import { useToast } from "@/components/ui/use-toast";
import { useUserCurrencyStore } from "@/store/user-currency-store";
import UseUserCurrency from "@/hooks/use-user-currency";
import { DashboardTab, useDashboardTabStore } from "@/store/dashboard-tab-store";

export default function DashboardTransit() {
  const setActiveTab = useDashboardTabStore((state) => state.setActiveTab);
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const userLocation = useUserStore((state) => state.user.location);
  const setUserLocation = useUserStore((state) => state.setUserLocation);
  const userCurrencies = useUserCurrencyStore((state) => state.userCurrencies);
  const removeCurrencyFromUser = useUserCurrencyStore(
    (state) => state.removeCurrencyFromUser,
  );
  const [transits, setTransits] = useState<Transit[]>([]);
  const { toast } = useToast();

  const userCurrency = userCurrencies.find(
    (uc) => uc.currency === Currency.Ien,
  );

  UseUserCurrency();

  useEffect(() => {
    getTransitsFromLocation(userLocation).then((transits) =>
      setTransits(transits),
    );
  }, [userLocation]);

  function handleTransit(transit: Transit) {
    if (userCurrency === undefined || userCurrency.amount < transit.price) {
      toast({
        title:
          dictionary.dashboard["dashboard.transit.toast.no-currency.title"],
        description: formatString(
          dictionary.dashboard[
            "dashboard.transit.toast.no-currency.description"
          ],
          transit.price,
        ),
        variant: "destructive",
      });
    } else {
      removeCurrencyFromUser(Currency.Ien, BigInt(transit.price));
      setUserLocation(transit.destination);
      setActiveTab(DashboardTab.about);

      toast({
        title: dictionary.dashboard["dashboard.transit.toast.success.title"],
        description: formatString(
          dictionary.dashboard["dashboard.transit.toast.success.description"],
          //@ts-ignore Imlicit any
          dictionary.location[transit.destination],
        ),
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.dashboard["dashboard.transit.title"]}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {transits.length > 0 ? (
          transits.map((transit) => (
            // TODO: somehow react warns "Each child in a list should have a unique "key" prop"
            // even when there are provided key, idk what to do with it
            <div
              key={transit.id}
              className="flex flex-wrap gap-5 border-t pt-5"
            >
              <Image
                className="h-[200px] w-[200px] rounded-xl object-cover"
                src={`/location/${transit.destination}.png`}
                width={1100}
                height={150}
                alt={transit.destination}
              />
              <div className="flex flex-1 flex-col justify-between">
                <>
                  <TypographyH4>
                    {/* @ts-ignore Imlicit any */}
                    {dictionary.location[transit.destination]}
                  </TypographyH4>
                  <TypographyP>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    ultrices nunc turpis, non consequat odio consequat a. Proin
                    felis sapien, sagittis ac neque et, consequat lobortis est.
                    In vel purus et magna vestibulum venenatis. Curabitur dictum
                    est sed eleifend pulvinar.
                  </TypographyP>
                </>
                <Button
                  className="mt-2 w-fit self-end"
                  variant="secondary"
                  onClick={() => handleTransit(transit)}
                >
                  {formatString(
                    dictionary.dashboard["dashboard.transit.button"],
                    transit.price,
                    <Image className="mx-1 h-6 w-6" src={IenIcon} alt="Ien" />,
                  )}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <>
            <Skeleton className="h-[210px]" />
            <Skeleton className="h-[210px]" />
            <Skeleton className="h-[210px]" />
          </>
        )}
      </CardContent>
    </Card>
  );
}
