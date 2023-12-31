import Image from "next/image";
import { SeedCropIncluded } from "@/services/data-access/seed";
import { useDictionaryStore } from "@/store/dictionary-store";
import formatString from "@/util/format-string";
import { Currency } from "@prisma/client";

import { cn } from "@/lib/utils";
import { useAddUserSeedMutation } from "@/hooks/mutations/use-add-user-seed-mutation";
import { useRemoveUserCurrencyMutation } from "@/hooks/mutations/use-remove-user-currency-mutation";
import { useUserCurrencyQuery } from "@/hooks/queries/use-user-currency-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import TypographyLarge from "@/components/typography/large";
import TypographyP from "@/components/typography/p";
import TypographySmall from "@/components/typography/small";

type Props = {
  seed: SeedCropIncluded;
};

const ShopSeedItem = ({ seed }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { mutate: addSeedToUser } = useAddUserSeedMutation();
  const { data: userCurrency } = useUserCurrencyQuery(Currency.Ien);
  const { mutate: removeCurrencyFromUser } = useRemoveUserCurrencyMutation();
  const { toast } = useToast();

  const handleBuySeed = (seed: SeedCropIncluded) => {
    if (userCurrency === undefined || userCurrency.amount < seed.price) {
      toast({
        description: formatString(
          dictionary.dashboard[
            "actions.capital.shop-seed.sheet.toast.no-currency"
          ],
          <Icons.Ien />,
          <Image
            className="mx-1 inline h-6 w-6"
            width={27}
            height={27}
            src={`/seed/${seed.name}.png`}
            alt={seed.name}
          />,
          // @ts-ignore Implicit any
          dictionary.item.seed[seed.name]
        ),
      });
      return;
    }

    removeCurrencyFromUser({ currency: Currency.Ien, amount: seed.price });
    addSeedToUser({ seedId: seed.id, amount: 1 });

    toast({
      description: formatString(
        dictionary.dashboard["actions.capital.shop-seed.sheet.toast.success"],
        <Image
          className="mx-1 inline h-6 w-6"
          width={27}
          height={27}
          src={`/seed/${seed.name}.png`}
          alt={seed.name}
        />,
        // @ts-ignore Implicit any,
        dictionary.item.seed[seed.name],
        <Icons.Ien />,
        seed.price
      ),
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-5 rounded-lg border bg-card p-5 text-card-foreground shadow-sm",
        seed.reGrowthDays && seed.isMultiply
          ? "col-span-1 sm:col-span-2"
          : "col-span-1"
      )}
    >
      <div className="flex gap-5">
        <Image
          className="h-12 w-12"
          width={54}
          height={54}
          src={`/seed/${seed.name}.png`}
          alt={seed.name}
        />
        <div className="flex flex-col">
          <TypographyLarge>
            {/* @ts-ignore Implicit any */}
            {dictionary.item.seed[seed.name]}
          </TypographyLarge>
          <TypographySmall>
            {formatString(
              dictionary.dashboard["actions.capital.shop-seed.sheet.price"],
              seed.price,
              <Icons.Ien />
            )}
          </TypographySmall>
        </div>
      </div>
      <div className="mb-auto flex flex-col">
        <TypographyP>
          {formatString(
            dictionary.dashboard["actions.capital.shop-seed.sheet.description"],
            seed.growthDays,
            <Image
              className="mx-1 inline h-6 w-6"
              width={27}
              height={27}
              src={`/crop/${seed.crop?.name}.png`}
              alt={seed.crop?.name ?? "Crop"}
            />,
            // @ts-ignore Implicit any
            dictionary.item.crop[seed.crop?.name],
            <Icons.Ien />,
            seed.crop?.price
          )}
        </TypographyP>
        {seed.isMultiply ? (
          <TypographyP>
            {
              dictionary.dashboard[
                "actions.capital.shop-seed.sheet.is-multiply"
              ]
            }
          </TypographyP>
        ) : null}
        {seed.reGrowthDays ? (
          <TypographyP>
            {formatString(
              dictionary.dashboard[
                "actions.capital.shop-seed.sheet.re-growth-days"
              ],
              seed.reGrowthDays
            )}
          </TypographyP>
        ) : null}
      </div>
      <Button
        className="w-fit self-end"
        variant="secondary"
        onClick={() => handleBuySeed(seed)}
      >
        {dictionary.dashboard["actions.capital.shop-seed.sheet.button-label"]}
      </Button>
    </div>
  );
};

export default ShopSeedItem;
