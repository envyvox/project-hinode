import Image from "next/image";
import { cn } from "@/lib/utils";
import TypographyLarge from "@/components/typography/large";
import TypographySmall from "@/components/typography/small";
import IenIcon from "@/public/currency/Ien.png";
import { Button } from "@/components/ui/button";
import { SeedCropIncluded } from "@/services/data-access/seed";
import { Dictionary } from "@/store/dictionary-store";
import TypographyP from "@/components/typography/p";
import formatString from "@/util/format-string";

type Props = {
  dictonary: Dictionary;
  seed: SeedCropIncluded;
  handleBuySeed: (seed: SeedCropIncluded) => void;
};

const ShopSeedItem = ({ dictonary, seed, handleBuySeed }: Props) => {
  return (
    <div
      key={seed.id}
      className={cn(
        "flex flex-col gap-5 rounded-lg border bg-card p-5 text-card-foreground shadow-sm",
        seed.reGrowthDays && seed.isMultiply
          ? "col-span-1 sm:col-span-2"
          : "col-span-1",
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
          <TypographyLarge>{seed.name}</TypographyLarge>
          <TypographySmall>
            {formatString(
              "стоимостью {0} {1} иен",
              seed.price,
              <Image className="mx-1 inline h-5 w-5" src={IenIcon} alt="Ien" />,
            )}
          </TypographySmall>
        </div>
      </div>
      <div className="mb-auto flex flex-col">
        <TypographyP>
          {formatString(
            "Через {0} дня вырастет {1} {2} стоимостью {3} {4} иен.",
            seed.growthDays,
            <Image
              className="mx-1 inline h-6 w-6"
              width={27}
              height={27}
              src={`/crop/${seed.crop?.name}.png`}
              alt={seed.crop?.name ?? "Crop"}
            />,
            seed.crop?.name,
            <Image className="mx-1 inline h-6 w-6" src={IenIcon} alt="Ien" />,
            seed.crop?.price,
          )}
        </TypographyP>
        {seed.isMultiply ? (
          <TypographyP>Растет несколько шт. с одного семени.</TypographyP>
        ) : null}
        {seed.reGrowthDays ? (
          <TypographyP>
            {formatString(
              "После первого сбора будет давать урожай каждые {0} дня.",
              seed.reGrowthDays,
            )}
          </TypographyP>
        ) : null}
      </div>
      <Button
        className="w-fit self-end"
        variant="outline"
        onClick={() => handleBuySeed(seed)}
      >
        Купить
      </Button>
    </div>
  );
};

export default ShopSeedItem;
