import Image from "next/image";
import { UserFishIncluded } from "@/services/data-access/fish";
import { useDictionaryStore } from "@/store/dictionary-store";
import formatString from "@/util/format-string";
import { getRarityBorderColor } from "@/util/get-rarity-border-color";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import TypographyLarge from "@/components/typography/large";
import TypographySmall from "@/components/typography/small";

import ShopFisherPopover from "./shop-fisher-popover";

type Props = {
  userFish: UserFishIncluded;
};

const ShopFisherUserFish = ({ userFish }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <div
      className={cn(
        "flex flex-col gap-5 rounded-lg border bg-card p-5 text-card-foreground shadow-sm",
        getRarityBorderColor(userFish.fish.rarity)
      )}
    >
      <div className="flex gap-5">
        <Image
          className="h-12 w-12 object-contain"
          src={`/fish/${userFish.fish.name}.png`}
          alt={userFish.fish.name}
          width={54}
          height={54}
        />
        <div className="flex flex-col">
          <TypographyLarge>
            {/* @ts-ignore Implicit any */}
            {Number(userFish.amount)} {dictionary.item.fish[userFish.fish.name]}
          </TypographyLarge>
          <TypographySmall>
            {formatString(
              dictionary.dashboard["actions.seaport.shop-fisher.sheet.price"],
              userFish.fish.price,
              <Icons.Ien />
            )}
          </TypographySmall>
        </div>
      </div>
      <ShopFisherPopover userFish={userFish} />
    </div>
  );
};

export default ShopFisherUserFish;
