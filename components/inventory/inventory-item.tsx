import Image from "next/image";

import { cn } from "@/lib/utils";

import TypographyLarge from "../typography/large";
import TypographySmall from "../typography/small";

type Props = {
  src: string;
  name: string;
  amount: number;
  className?: string;
};

const InventoryItem = ({ src, name, amount, className = "" }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 rounded-lg border bg-card p-5 text-card-foreground shadow-sm",
        className
      )}
    >
      <div className="flex gap-5">
        <Image
          className="h-12 w-12 object-contain"
          src={src}
          alt={name}
          width={54}
          height={54}
        />
        <div className="flex flex-col items-start">
          <TypographyLarge>{name}</TypographyLarge>
          <TypographySmall>{amount}</TypographySmall>
        </div>
      </div>
    </div>
  );
};

export default InventoryItem;
