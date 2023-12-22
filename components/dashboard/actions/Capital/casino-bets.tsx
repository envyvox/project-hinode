import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import IenIcon from "@/public/currency/Ien.png";
import { Button } from "@/components/ui/button";
import { useDictionaryStore } from "@/store/dictionary-store";
import formatString from "@/util/format-string";

const maxBet = 1000;

const CasinoBets = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const [bet, setBet] = useState(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {dictionary.dashboard["dashboard.actions.capital.casino.bet.label"]}
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
              setBet(amount < 1 ? 1 : amount > maxBet ? maxBet : amount);
            }}
          />
          <Image className="mx-1 inline h-6 w-6" src={IenIcon} alt="Ien" />
          {dictionary.item.currency["Ien"].toLowerCase()}
        </div>
        <Button className="w-fit" variant="secondary">
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
