import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDictionaryStore } from "@/store/dictionary-store";
import TypographyMuted from "@/components/typography/muted";
import formatString from "@/util/format-string";
import Image from "next/image";
import { UserFishIncluded } from "@/services/data-access/fish";
import IenIcon from "@/public/currency/Ien.png";
import { Currency, Fish } from "@prisma/client";
import { useUserCurrencyStore } from "@/store/user-currency-store";
import { useUserFishStore } from "@/store/user-fish-store";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  userFish: UserFishIncluded;
};

const ShopFisherPopover = ({ userFish }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const addCurrencyToUser = useUserCurrencyStore(
    (state) => state.addCurrencyToUser,
  );
  const removeFishFromUser = useUserFishStore(
    (state) => state.removeFishFromUser,
  );
  const [sellAmount, setSellAmount] = useState(1);
  const { toast } = useToast();

  const sellFish = (fish: Fish, amount: number) => {
    removeFishFromUser(fish.id, amount);
    addCurrencyToUser(Currency.Ien, fish.price * amount);

    toast({
      description: formatString(
        dictionary.dashboard[
          "dashboard.actions.seaport.shop-fisher.sheet.toast.sell-one"
        ],
        <Image
          className="mx-1 inline h-6 w-6 object-contain"
          src={`/fish/${fish.name}.png`}
          alt={fish.name}
          width={27}
          height={27}
        />,
        amount,
        // @ts-ignore Implicit any
        dictionary.item.fish[fish.name],
        <Image className="mx-1 inline h-6 w-6" src={IenIcon} alt="Ien" />,
        fish.price * amount,
      ),
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-fit self-end" variant="outline">
          {
            dictionary.dashboard[
              "dashboard.actions.seaport.shop-fisher.sheet.button-label"
            ]
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <TypographyMuted>
            {
              dictionary.dashboard[
                "dashboard.actions.seaport.shop-fisher.sheet.popover.slider-label"
              ]
            }
          </TypographyMuted>
          <div className="flex gap-2">
            <TypographyMuted>1</TypographyMuted>
            <Slider
              defaultValue={[sellAmount]}
              value={[sellAmount]}
              onValueChange={(v) => setSellAmount(v[0])}
              max={userFish.amount}
              min={1}
              step={1}
            />
            <TypographyMuted>{userFish.amount}</TypographyMuted>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <TypographyMuted>
            {
              dictionary.dashboard[
                "dashboard.actions.seaport.shop-fisher.sheet.popover.input-label"
              ]
            }
          </TypographyMuted>
          <Input
            type="number"
            value={sellAmount}
            onChange={(e) => {
              const value = Number(e.target.value);
              setSellAmount(
                value < 1
                  ? 1
                  : value > userFish.amount
                    ? userFish.amount
                    : value,
              );
            }}
          />
        </div>
        <Button
          className="w-fit self-end"
          variant="outline"
          onClick={() => sellFish(userFish.fish, sellAmount)}
        >
          {formatString(
            dictionary.dashboard[
              "dashboard.actions.seaport.shop-fisher.sheet.popover.button-label"
            ],
            sellAmount * userFish.fish.price,
            <Image className="mx-1 inline h-5 w-5" src={IenIcon} alt="Ien" />,
          )}
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default ShopFisherPopover;
