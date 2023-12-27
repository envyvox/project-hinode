import { useDictionaryStore } from "@/store/dictionary-store";
import formatString from "@/util/format-string";
import { Currency } from "@prisma/client";
import { toast } from "sonner";

import { useAddUserLotteryMutation } from "@/hooks/mutations/use-add-user-lottery-mutation";
import { useRemoveUserCurrencyMutation } from "@/hooks/mutations/use-remove-user-currency-mutation";
import { useUserCurrencyQuery } from "@/hooks/queries/use-user-currency-query";
import { useUserLotteryQuery } from "@/hooks/queries/use-user-lottery-query";
import { useLottery } from "@/hooks/use-lottery";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";

import CasinoLotteryGift from "./casino-lottery-gift";
import CasinoLotteryParticipants from "./casino-lottery-participants";

const lotteryPrice = 500;
const lotteryMembers = 10;
const lotteryAward = 5000;

const CasinoLottery = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: userCurrency } = useUserCurrencyQuery(Currency.Ien);
  const { data: userLottery } = useUserLotteryQuery();
  const { mutate: removeUserCurrency } = useRemoveUserCurrencyMutation();
  const { mutate: addUserLottery, isLoading } = useAddUserLotteryMutation();

  useLottery();

  const handleBuyLottery = () => {
    if (userLottery) {
      toast.error(
        formatString(
          dictionary.dashboard[
            "actions.capital.casino.lottery.buy.toast.already-have"
          ],
          <Icons.LotteryTicket />
        )
      );
      return;
    }

    if (userCurrency === undefined || userCurrency.amount < lotteryPrice) {
      toast.error(
        formatString(
          dictionary.dashboard[
            "actions.capital.casino.lottery.buy.toast.no-currency"
          ],
          <Icons.Ien />,
          <Icons.LotteryTicket />
        )
      );
      return;
    }

    removeUserCurrency({ currency: Currency.Ien, amount: lotteryPrice });
    addUserLottery({});

    toast.success(
      formatString(
        dictionary.dashboard[
          "actions.capital.casino.lottery.buy.toast.success"
        ],
        <Icons.LotteryTicket />
      )
    );
  };

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>
          {dictionary.dashboard["actions.capital.casino.lottery.label"]}
        </CardTitle>
        <CardDescription>
          {formatString(
            dictionary.dashboard["actions.capital.casino.lottery.description"],
            <Icons.LotteryTicket />,
            lotteryPrice,
            <Icons.Ien />,
            lotteryMembers,
            lotteryAward,
            <Icons.Ien />
          )}
          <Button
            variant="secondary"
            className="mt-5 flex text-secondary-foreground"
            disabled={isLoading}
            onClick={handleBuyLottery}
          >
            {
              dictionary.dashboard[
                "actions.capital.casino.lottery.button-label"
              ]
            }
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <CasinoLotteryGift />
        <CasinoLotteryParticipants />
      </CardContent>
    </Card>
  );
};

export default CasinoLottery;
