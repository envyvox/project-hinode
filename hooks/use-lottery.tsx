import { useEffect } from "react";
import { useDictionaryStore } from "@/store/dictionary-store";
import formatString from "@/util/format-string";
import shuffle from "@/util/shuffle";
import { Currency } from "@prisma/client";
import { toast } from "sonner";

import { Icons } from "@/components/icons";
import UserHoverCard from "@/components/user-hover-card";

import { useAddUserCurrencyMutation } from "./mutations/use-add-user-currency-mutation";
import { useDeleteLotteryUsersMutation } from "./mutations/use-delete-lottery-users-mutation";
import { useLotteryUsersQuery } from "./queries/use-lottery-users-query";

const lotteryAward = 5000;
const lotteryUsersReq = 2;

export const useLottery = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: lotteryUsers } = useLotteryUsersQuery();
  const { mutate: addUserCurrency } = useAddUserCurrencyMutation();
  const { mutate: deleteLotteryUsers } = useDeleteLotteryUsersMutation();

  useEffect(() => {
    if (lotteryUsers && lotteryUsers.length >= lotteryUsersReq) {
      const winner = shuffle(lotteryUsers)[0];

      addUserCurrency({
        userId: winner.userId,
        currency: Currency.Ien,
        amount: lotteryAward,
      });
      deleteLotteryUsers();

      toast.success(
        formatString(
          dictionary.dashboard["actions.capital.casino.lottery.winner.toast"],
          lotteryUsersReq,
          lotteryAward,
          <Icons.Ien />,
          <UserHoverCard user={winner.user} />
        ),
        {
          duration: Infinity,
        }
      );
    }
  }, [addUserCurrency, deleteLotteryUsers, dictionary, lotteryUsers]);
};
