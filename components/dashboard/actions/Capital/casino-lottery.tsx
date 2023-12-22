import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import formatString from "@/util/format-string";
import Image from "next/image";
import IenIcon from "@/public/currency/Ien.png";
import LotteryTicket from "@/public/etc/LotteryTicket.png";
import { Button } from "@/components/ui/button";
import { useDictionaryStore } from "@/store/dictionary-store";
import CasinoLotteryParticipants from "./casino-lottery-participants";
import CasinoLotteryGift from "./casino-lottery-gift";

const lotteryPrice = 500;
const lotteryMembers = 10;
const lotteryAward = 5000;

const CasinoLottery = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>
          {
            dictionary.dashboard[
              "dashboard.actions.capital.casino.lottery.label"
            ]
          }
        </CardTitle>
        <CardDescription>
          {formatString(
            dictionary.dashboard[
              "dashboard.actions.capital.casino.lottery.description"
            ],
            <Image
              className="mx-1 inline h-6 w-6"
              src={LotteryTicket}
              alt="LotteryTicket"
            />,
            lotteryPrice,
            <Image className="mx-1 inline h-6 w-6" src={IenIcon} alt="Ien" />,
            lotteryMembers,
            lotteryAward,
            <Image className="mx-1 inline h-6 w-6" src={IenIcon} alt="Ien" />,
          )}
          <Button
            variant="secondary"
            className="mt-5 flex text-secondary-foreground"
          >
            {
              dictionary.dashboard[
                "dashboard.actions.capital.casino.lottery.button-label"
              ]
            }
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <CasinoLotteryGift />
        <CasinoLotteryParticipants />
      </CardContent>
    </Card>
  );
};

export default CasinoLottery;
