import { cn } from "@/lib/utils";
import IenIcon from "@/public/currency/Ien.png";
import LotteryTicket from "@/public/etc/LotteryTicket.png";
import Image from "next/image";

type Props = {
  className?: string;
};

export const IconIen = ({ className }: Props) => {
  return (
    <Image
      className={cn("mx-1 inline h-5 w-5", className)}
      src={IenIcon}
      placeholder="blur"
      alt="Ien"
    />
  );
};

export const IconLotteryTicket = ({ className }: Props) => {
  return (
    <Image
      className={cn("mx-1 inline h-5 w-5", className)}
      src={LotteryTicket}
      placeholder="blur"
      alt="Ien"
    />
  );
};
