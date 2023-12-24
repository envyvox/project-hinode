import { useDictionaryStore } from "@/store/dictionary-store";
import formatString from "@/util/format-string";

import { useLotteryUsersQuery } from "@/hooks/queries/use-lottery-users-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/icons";
import TypographyLarge from "@/components/typography/large";
import TypographyMuted from "@/components/typography/muted";
import UserHoverCard from "@/components/user-hover-card";

const CasinoLotteryParticipants = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: lotteryUsers, isLoading } = useLotteryUsersQuery();

  return (
    <div>
      <TypographyLarge>
        {
          dictionary.dashboard[
            "actions.capital.casino.lottery.participants.label"
          ]
        }
      </TypographyLarge>
      {isLoading ? (
        <Skeleton className="h-[130px]" />
      ) : lotteryUsers?.length ? (
        <div className="grid grid-cols-1 gap-1 xl:grid-cols-2">
          {lotteryUsers.map((lotteryUser) => (
            <UserHoverCard key={lotteryUser.id} user={lotteryUser.user} />
          ))}
        </div>
      ) : (
        <TypographyMuted>
          {formatString(
            dictionary.dashboard[
              "actions.capital.casino.lottery.participants.empty"
            ],
            <Icons.LotteryTicket />
          )}
        </TypographyMuted>
      )}
    </div>
  );
};

export default CasinoLotteryParticipants;
