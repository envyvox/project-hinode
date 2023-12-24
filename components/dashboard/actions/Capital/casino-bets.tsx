import { useState } from "react";
import { Dictionary, useDictionaryStore } from "@/store/dictionary-store";
import formatString from "@/util/format-string";
import getRandomNumberBetween from "@/util/get-random-number";
import { Currency } from "@prisma/client";

import { useAddUserCurrencyMutation } from "@/hooks/mutations/use-add-user-currency-mutation";
import { useRemoveUserCurrencyMutation } from "@/hooks/mutations/use-remove-user-currency-mutation";
import { useUserCurrencyQuery } from "@/hooks/queries/use-user-currency-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

import CasinoBetsTooltip from "./casino-bets-tooptip";

const minBet = 10;
const maxBet = 1000;

const getWinMessage = (dictionary: Dictionary, amount: number) => {
  return formatString(
    dictionary.dashboard["actions.capital.casino.bet.toast.description.win"],
    amount,
    <Icons.Ien />
  );
};

const getLoseMessage = (dictionary: Dictionary, amount: number) => {
  return formatString(
    dictionary.dashboard["actions.capital.casino.bet.toast.description.lose"],
    amount,
    <Icons.Ien />
  );
};

const CasinoBets = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: userCurrency } = useUserCurrencyQuery(Currency.Ien);
  const { mutate: addCurrencyToUser } = useAddUserCurrencyMutation();
  const { mutate: removeCurrencyFromUser } = useRemoveUserCurrencyMutation();
  const [bet, setBet] = useState(minBet);
  const { toast } = useToast();

  const handleBet = () => {
    if (userCurrency === undefined || userCurrency.amount < bet) {
      const noCurrencyDescription = formatString(
        dictionary.dashboard["actions.capital.casino.bet.toast.no-currency"],
        <Icons.Ien />
      );

      toast({
        description: noCurrencyDescription,
        variant: "destructive",
      });
      return;
    }

    const firstDrop = getRandomNumberBetween(1, 101);
    const secondDrop = getRandomNumberBetween(1, 101);
    const cubeDrop = Math.floor((firstDrop + secondDrop) / 2);

    let response: React.ReactNode;

    switch (true) {
      case cubeDrop >= 55 && cubeDrop < 90:
        addCurrencyToUser({ currency: Currency.Ien, amount: bet * 2 });
        response = getWinMessage(dictionary, bet * 2);
        break;
      case cubeDrop >= 90 && cubeDrop < 100:
        addCurrencyToUser({ currency: Currency.Ien, amount: bet * 3 });
        response = getWinMessage(dictionary, bet * 4);
        break;
      case cubeDrop === 100:
        addCurrencyToUser({ currency: Currency.Ien, amount: bet * 9 });
        response = getWinMessage(dictionary, bet * 10);
        break;
      default:
        removeCurrencyFromUser({ currency: Currency.Ien, amount: bet });
        response = getLoseMessage(dictionary, bet);
        break;
    }

    toast({
      title: formatString(
        dictionary.dashboard["actions.capital.casino.bet.toast.title"],
        cubeDrop
      ) as string,
      description: response,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {dictionary.dashboard["actions.capital.casino.bet.label"]}
          <CasinoBetsTooltip />
        </CardTitle>
        <CardDescription>
          {dictionary.dashboard["actions.capital.casino.bet.description"]}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Label htmlFor="amount">
          {formatString(
            dictionary.dashboard["actions.capital.casino.bet.amount-label"],
            minBet,
            maxBet
          )}
        </Label>
        <div>
          <Input
            type="number"
            id="amount"
            className="inline w-fit max-w-[80px]"
            value={bet}
            onChange={(e) => {
              const amount = parseInt(e.target.value);
              setBet(
                isNaN(amount)
                  ? minBet
                  : amount < minBet
                    ? minBet
                    : amount > maxBet
                      ? maxBet
                      : amount
              );
            }}
          />
          <Icons.Ien />
          {dictionary.item.currency[Currency.Ien].toLowerCase()}
        </div>
        <Button className="w-fit" variant="secondary" onClick={handleBet}>
          {dictionary.dashboard["actions.capital.casino.bet.button-label"]}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CasinoBets;
