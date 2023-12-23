import { Currency, Transit } from "@prisma/client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import TypographyH4 from "@/components/typography/h4";
import TypographyP from "@/components/typography/p";
import { Button } from "@/components/ui/button";
import formatString from "@/util/format-string";
import { useDictionaryStore } from "@/store/dictionary-store";
import {
  DashboardTab,
  useDashboardTabStore,
} from "@/store/dashboard-tab-store";
import { useUserStore } from "@/store/user-store";
import { useUserCurrencyQuery } from "@/hooks/queries/use-user-currency-query";
import { useRemoveUserCurrencyMutation } from "@/hooks/mutations/use-remove-user-currency-mutation";
import { useToast } from "../ui/use-toast";
import { Icons } from "../icons";

type Props = {
  transit: Transit;
};

const DashboardTransitItem = ({ transit }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const setActiveTab = useDashboardTabStore((state) => state.setActiveTab);
  const setUserLocation = useUserStore((state) => state.setUserLocation);
  const { data: userCurrency } = useUserCurrencyQuery(Currency.Ien);
  const { mutate: removeCurrencyFromUser } = useRemoveUserCurrencyMutation();
  const { toast } = useToast();

  const handleTransit = (transit: Transit) => {
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
      removeCurrencyFromUser({ currency: Currency.Ien, amount: transit.price });
      setUserLocation(transit.destination);
      setActiveTab(DashboardTab.about);

      toast({
        title: dictionary.dashboard["dashboard.transit.toast.success.title"],
        description: formatString(
          dictionary.dashboard["dashboard.transit.toast.success.description"],
          dictionary.location[transit.destination],
        ),
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-5 border-t pt-5">
      {/* // TODO: Replace skeleton with Image */}
      <Skeleton className="h-[200px] w-[200px]" />
      <div className="flex flex-1 flex-col justify-between">
        <>
          <TypographyH4>
            {dictionary.location[transit.destination]}
          </TypographyH4>
          <TypographyP>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            ultrices nunc turpis, non consequat odio consequat a. Proin felis
            sapien, sagittis ac neque et, consequat lobortis est. In vel purus
            et magna vestibulum venenatis. Curabitur dictum est sed eleifend
            pulvinar.
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
            <Icons.Ien />,
          )}
        </Button>
      </div>
    </div>
  );
};

export default DashboardTransitItem;
