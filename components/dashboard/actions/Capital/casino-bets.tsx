import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dictionary, useDictionaryStore } from "@/store/dictionary-store";
import formatString from "@/util/format-string";
import { useUserCurrencyStore } from "@/store/user-currency-store";
import { Currency } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import getRandomNumberBetween from "@/util/get-random-number";
import CasinoBetsTooltip from "./casino-bets-tooptip";
import { IconIen } from "@/components/icons";

const minBet = 10;
const maxBet = 1000;

const getWinMessage = (dictionary: Dictionary, amount: number) => {
  return formatString(
    dictionary.dashboard[
      "dashboard.actions.capital.casino.bet.toast.description.win"
    ],
    amount,
    <IconIen />,
  );
};

const getLoseMessage = (dictionary: Dictionary, amount: number) => {
  return formatString(
    dictionary.dashboard[
      "dashboard.actions.capital.casino.bet.toast.description.lose"
    ],
    amount,
    <IconIen />,
  );
};

const CasinoBets = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const userCurrencies = useUserCurrencyStore((state) => state.userCurrencies);
  const addCurrencyToUser = useUserCurrencyStore(
    (state) => state.addCurrencyToUser,
  );
  const removeCurrencyFromUser = useUserCurrencyStore(
    (state) => state.removeCurrencyFromUser,
  );
  const [bet, setBet] = useState(minBet);
  const { toast } = useToast();

  const handleBet = () => {
    const userCurrency = userCurrencies.find(
      (uc) => uc.currency === Currency.Ien,
    );

    if (userCurrency === undefined || userCurrency.amount < bet) {
      const noCurrencyDescription = formatString(
        dictionary.dashboard[
          "dashboard.actions.capital.casino.bet.toast.no-currency"
        ],
        <IconIen />,
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
        addCurrencyToUser(Currency.Ien, bet);
        response = getWinMessage(dictionary, bet * 2);
        break;
      case cubeDrop >= 90 && cubeDrop < 100:
        addCurrencyToUser(Currency.Ien, bet * 3);
        response = getWinMessage(dictionary, bet * 4);
        break;
      case cubeDrop === 100:
        addCurrencyToUser(Currency.Ien, bet * 9);
        response = getWinMessage(dictionary, bet * 10);
        break;
      default:
        removeCurrencyFromUser(Currency.Ien, bet);
        response = getLoseMessage(dictionary, bet);
        break;
    }

    toast({
      title: formatString(
        dictionary.dashboard[
          "dashboard.actions.capital.casino.bet.toast.title"
        ],
        cubeDrop,
      ) as string,
      description: response,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {dictionary.dashboard["dashboard.actions.capital.casino.bet.label"]}
          <CasinoBetsTooltip />
        </CardTitle>
        <CardDescription>
          {
            dictionary.dashboard[
              "dashboard.actions.capital.casino.bet.description"
            ]
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Label htmlFor="amount">
          {formatString(
            dictionary.dashboard[
              "dashboard.actions.capital.casino.bet.amount-label"
            ],
            minBet,
            maxBet,
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
                      : amount,
              );
            }}
          />
          <IconIen />
          {dictionary.item.currency[Currency.Ien].toLowerCase()}
        </div>
        <Button className="w-fit" variant="secondary" onClick={handleBet}>
          {
            dictionary.dashboard[
              "dashboard.actions.capital.casino.bet.button-label"
            ]
          }
        </Button>
      </CardContent>
    </Card>
  );
};

export default CasinoBets;
