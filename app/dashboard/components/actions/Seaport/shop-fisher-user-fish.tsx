import { Button } from "@/components/ui/button";
import { UserWithFish } from "@/data-access/fish";
import { formatString } from "@/util/format-string";
import { Fish } from "@prisma/client";
import Image from "next/image";
import React from "react";
import IenIcon from "@/public/currency/Ien.png";
import { Dictionary } from "@/store/dictionary-store";
import { TypographyMuted } from "@/components/typography/muted";

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
  if (userFish.length < 1)
    return (
      <TypographyMuted>
        {
          dictionary.dashboard[
            "dashboard.actions.seaport.shop-fisher.sheet.no-fish"
          ]
        }
      </TypographyMuted>
    );

  return userFish.map((uf) => (
    // TODO: somehow react warns "Each child in a list should have a unique "key" prop"
    // even when there are provided key, idk what to do with it
    <div
      key={uf.fishId}
      className="flex h-fit flex-col items-center justify-between gap-1 rounded-lg border p-2"
    >
      <Image
        className="h-8 w-8 object-contain"
        src={`/fish/${uf.fish.name}.png`}
        alt={uf.fish.name}
        width={36}
        height={36}
      />
      {Number(uf.amount)} {uf.fish.name}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => sellFish(uf.fish, 1)}
      >
        {formatString(
          dictionary.dashboard[
            "dashboard.actions.seaport.shop-fisher.sheet.sell-one"
          ],
          uf.fish.price,
          <Image className="mx-1 h-6 w-6" src={IenIcon} alt="Ien" />,
        )}
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => sellFish(uf.fish, uf.amount)}
      >
        {formatString(
          dictionary.dashboard[
            "dashboard.actions.seaport.shop-fisher.sheet.sell-all"
          ],
          uf.amount,
          uf.fish.price * uf.amount,
          <Image className="mx-1 h-6 w-6" src={IenIcon} alt="Ien" />,
        )}
      </Button>
    </div>
  ));
}
