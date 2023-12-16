import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTransitsFromLocation } from "@/services/data-access/transit";
import { useUserStore } from "@/store/user-store";
import { Currency, Transit } from "@prisma/client";
import { useEffect, useState } from "react";
import { useDictionaryStore } from "@/store/dictionary-store";

import { useToast } from "@/components/ui/use-toast";
import { useUserCurrencyStore } from "@/store/user-currency-store";
import UseUserCurrency from "@/hooks/use-user-currency";
import {
  DashboardTab,
  useDashboardTabStore,
} from "@/store/dashboard-tab-store";
import formatString from "@/util/format-string";
import DashboardTransitSkeleton from "./dashboard-transit-skeleton";
import DashboardTransitItem from "./dashboard-transit-item";

const DashboardTransit = () => {
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

  UseUserCurrency();

  useEffect(() => {
    getTransitsFromLocation(userLocation).then((transits) =>
      setTransits(transits),
    );
  }, [userLocation]);

  const handleTransit = (transit: Transit) => {
    const userCurrency = userCurrencies.find(
      (uc) => uc.currency === Currency.Ien,
    );

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
      removeCurrencyFromUser(Currency.Ien, transit.price);
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
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.dashboard["dashboard.transit.title"]}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {transits.length ? (
          transits.map((transit) => (
            <DashboardTransitItem
              key={transit.id}
              dictionary={dictionary}
              transit={transit}
              handleTransit={handleTransit}
            />
          ))
        ) : (
          <DashboardTransitSkeleton />
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardTransit;
