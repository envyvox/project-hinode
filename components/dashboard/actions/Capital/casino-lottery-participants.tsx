import TypographyLarge from "@/components/typography/large";
import TypographyMuted from "@/components/typography/muted";
import formatString from "@/util/format-string";
import Image from "next/image";
import LotteryTicket from "@/public/etc/LotteryTicket.png";
import { useDictionaryStore } from "@/store/dictionary-store";

const CasinoLotteryParticipants = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <div>
      <TypographyLarge>
        {
          dictionary.dashboard[
            "dashboard.actions.capital.casino.lottery.participants.label"
          ]
        }
      </TypographyLarge>
      <TypographyMuted>
        {formatString(
          dictionary.dashboard[
            "dashboard.actions.capital.casino.lottery.participants.empty"
          ],
          <Image
            className="mx-1 inline h-6 w-6"
            src={LotteryTicket}
            alt="LotteryTicket"
          />,
        )}
      </TypographyMuted>
    </div>
  );
};

export default CasinoLotteryParticipants;
