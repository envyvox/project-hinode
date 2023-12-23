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
import { IconIen } from "@/components/icons";
import { Currency, Fish } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { useAddUserCurrencyMutation } from "@/hooks/mutations/use-add-user-currency-mutation";
import { useRemoveUserFishMutation } from "@/hooks/mutations/use-remove-user-fish-mutation";

type Props = {
  userFish: UserFishIncluded;
};

const ShopFisherPopover = ({ userFish }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { mutate: addCurrencyToUser } = useAddUserCurrencyMutation();
  const { mutate: removeFishFromUser } = useRemoveUserFishMutation();
  const [sellAmount, setSellAmount] = useState(1);
  const { toast } = useToast();

  const sellFish = (fish: Fish, amount: number) => {
    removeFishFromUser({ fishId: fish.id, amount: amount });
    addCurrencyToUser({ currency: Currency.Ien, amount: fish.price * amount });

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
        <IconIen />,
        fish.price * amount,
      ),
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-fit self-end" variant="secondary">
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
          variant="secondary"
          onClick={() => sellFish(userFish.fish, sellAmount)}
        >
          {formatString(
            dictionary.dashboard[
              "dashboard.actions.seaport.shop-fisher.sheet.popover.button-label"
            ],
            sellAmount * userFish.fish.price,
            <IconIen />,
          )}
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default ShopFisherPopover;
