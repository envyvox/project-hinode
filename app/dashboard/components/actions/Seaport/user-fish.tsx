import { Button } from "@/components/ui/button";
import { UserWithFish } from "@/data-access/fish";
import { formatString } from "@/util/format-string";
import { Fish } from "@prisma/client";
import Image from "next/image";
import React from "react";
import IenIcon from "@/public/currency/Ien.png";
import { Dictionary } from "@/store/dictionary-store";

type Props = {
  userFish: UserWithFish[];
  dictionary: Dictionary;
  sellFish: (fish: Fish, amount: number) => void;
};

export default function ShopFisherUserFish({
  userFish,
  dictionary,
  sellFish,
}: Props) {
  return userFish.length > 0 ? (
    userFish.map((userFish) => (
      <div
        key={userFish.fishId}
        className="flex h-fit flex-col items-center justify-between gap-1 rounded-lg border p-2"
      >
        <Image
          className="h-8 w-8 object-contain"
          src={`/fish/${userFish.fish.name}.png`}
          alt={userFish.fish.name}
          width={36}
          height={36}
        />
        {Number(userFish.amount)} {userFish.fish.name}
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => sellFish(userFish.fish, 1)}
        >
          {formatString(
            dictionary.dashboard[
              "dashboard.actions.seaport.shop-fisher.sheet.sell-one"
            ],
            userFish.fish.price,
            <Image className="mx-1 h-6 w-6" src={IenIcon} alt="Ien" />,
          )}
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => sellFish(userFish.fish, userFish.amount)}
        >
          {formatString(
            dictionary.dashboard[
              "dashboard.actions.seaport.shop-fisher.sheet.sell-all"
            ],
            userFish.amount,
            userFish.fish.price * userFish.amount,
            <Image className="mx-1 h-6 w-6" src={IenIcon} alt="Ien" />,
          )}
        </Button>
      </div>
    ))
  ) : (
    <div>
      {
        dictionary.dashboard[
          "dashboard.actions.seaport.shop-fisher.sheet.no-fish"
        ]
      }
    </div>
  );
}
