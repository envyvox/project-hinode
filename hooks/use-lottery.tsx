import { useEffect } from "react";
import { useLotteryUsersQuery } from "./queries/use-lottery-users-query";
import shuffle from "@/util/shuffle";
import { useAddUserCurrencyMutation } from "./mutations/use-add-user-currency-mutation";
import { Currency } from "@prisma/client";
import { useDeleteLotteryUsersMutation } from "./mutations/use-delete-lottery-users-mutation";
import { useToast } from "@/components/ui/use-toast";
import formatString from "@/util/format-string";
import { Icons } from "@/components/icons";
import UserHoverCard from "@/components/user-hover-card";
import { useDictionaryStore } from "@/store/dictionary-store";

const lotteryAward = 5000;
const lotteryUsersReq = 2;

export const useLottery = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: lotteryUsers } = useLotteryUsersQuery();
  const { mutate: addUserCurrency } = useAddUserCurrencyMutation();
  const { mutate: deleteLotteryUsers } = useDeleteLotteryUsersMutation();
  const { toast } = useToast();

  useEffect(() => {
    if (lotteryUsers && lotteryUsers.length >= lotteryUsersReq) {
      const winner = shuffle(lotteryUsers)[0];

      addUserCurrency({
        userId: winner.userId,
        currency: Currency.Ien,
        amount: lotteryAward,
      });
      deleteLotteryUsers();

      toast({
        description: formatString(
          dictionary.dashboard[
            "dashboard.actions.capital.casino.lottery.winner.toast"
          ],
          lotteryUsersReq,
          lotteryAward,
          <Icons.Ien />,
          <UserHoverCard user={winner.user} />,
        ),
        duration: Infinity,
      });
    }
  }, [addUserCurrency, deleteLotteryUsers, dictionary, lotteryUsers, toast]);
};
