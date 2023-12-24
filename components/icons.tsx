import Image from "next/image";
import IenIcon from "@/public/currency/Ien.png";
import LotteryTicketIcon from "@/public/etc/LotteryTicket.png";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const Ien = ({ className }: Props) => (
  <Image
    className={cn("mx-1 inline h-5 w-5", className)}
    src={IenIcon}
    placeholder="blur"
    alt="Ien"
  />
);

const LotteryTicket = ({ className }: Props) => (
  <Image
    className={cn("mx-1 inline h-5 w-5", className)}
    src={LotteryTicketIcon}
    placeholder="blur"
    alt="Ien"
  />
);

export const Icons = {
  Ien,
  LotteryTicket,
};
