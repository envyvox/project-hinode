import Image from "next/image";
import { cn } from "@/lib/utils";
import TypographyLarge from "@/components/typography/large";
import TypographySmall from "@/components/typography/small";
import { IconIen } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { SeedCropIncluded } from "@/services/data-access/seed";
import { Dictionary } from "@/store/dictionary-store";
import TypographyP from "@/components/typography/p";
import formatString from "@/util/format-string";

type Props = {
  dictionary: Dictionary;
  seed: SeedCropIncluded;
  handleBuySeed: (seed: SeedCropIncluded) => void;
};

const ShopSeedItem = ({ dictionary, seed, handleBuySeed }: Props) => {
  return (
    <div
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
          <TypographyLarge>
            {/* @ts-ignore Implicit any */}
            {dictionary.item.seed[seed.name]}
          </TypographyLarge>
          <TypographySmall>
            {formatString(
              dictionary.dashboard[
                "dashboard.actions.capital.shop-seed.sheet.price"
              ],
              seed.price,
              <IconIen />,
            )}
          </TypographySmall>
        </div>
      </div>
      <div className="mb-auto flex flex-col">
        <TypographyP>
          {formatString(
            dictionary.dashboard[
              "dashboard.actions.capital.shop-seed.sheet.description"
            ],
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
            <IconIen />,
            seed.crop?.price,
          )}
        </TypographyP>
        {seed.isMultiply ? (
          <TypographyP>
            {
              dictionary.dashboard[
                "dashboard.actions.capital.shop-seed.sheet.is-multiply"
              ]
            }
          </TypographyP>
        ) : null}
        {seed.reGrowthDays ? (
          <TypographyP>
            {formatString(
              dictionary.dashboard[
                "dashboard.actions.capital.shop-seed.sheet.re-growth-days"
              ],
              seed.reGrowthDays,
            )}
          </TypographyP>
        ) : null}
      </div>
      <Button
        className="w-fit self-end"
        variant="secondary"
        onClick={() => handleBuySeed(seed)}
      >
        {
          dictionary.dashboard[
            "dashboard.actions.capital.shop-seed.sheet.button-label"
          ]
        }
      </Button>
    </div>
  );
};

export default ShopSeedItem;
