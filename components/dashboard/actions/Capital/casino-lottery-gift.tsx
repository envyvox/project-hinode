import TypographyLarge from "@/components/typography/large";
import TypographyMuted from "@/components/typography/muted";
import { Button } from "@/components/ui/button";
import UsersSelect from "@/components/users-select";
import { GameUser } from "@/services/data-access/user";
import formatString from "@/util/format-string";
import { useState } from "react";
import { useDictionaryStore } from "@/store/dictionary-store";
import { Icons } from "@/components/icons";
import { useUserCurrencyQuery } from "@/hooks/queries/use-user-currency-query";
import { Currency } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/store/user-store";
import { useUserLotteryQuery } from "@/hooks/queries/use-user-lottery-query";
import { useRemoveUserCurrencyMutation } from "@/hooks/mutations/use-remove-user-currency-mutation";
import { useAddUserLotteryMutation } from "@/hooks/mutations/use-add-user-lottery-mutation";

const lotteryPrice = 500;
const deliveryPrice = 100;

const CasinoLotteryGift = () => {
  const user = useUserStore((state) => state.user);
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: userCurrency } = useUserCurrencyQuery(Currency.Ien);
  const [selectedUser, setSelectedUser] = useState<GameUser>();
  const { data: selectedUserLottery } = useUserLotteryQuery(selectedUser?.id);
  const { mutate: removeUserCurrency } = useRemoveUserCurrencyMutation();
  const { mutate: addUserLottery } = useAddUserLotteryMutation();
  const { toast } = useToast();

  const handleLotteryGift = () => {
    setSelectedUser(undefined);

    if (selectedUser?.id === user.id) {
      toast({
        description: formatString(
          dictionary.dashboard[
            "dashboard.actions.capital.casino.lottery.gift.toast.yourself"
          ],
          <Icons.LotteryTicket />,
        ),
        variant: "destructive",
      });
      return;
    }

    if (
      userCurrency === undefined ||
      userCurrency.amount < lotteryPrice + deliveryPrice
    ) {
      toast({
        description: formatString(
          dictionary.dashboard[
            "dashboard.actions.capital.casino.lottery.gift.toast.no-currency"
          ],
          <Icons.Ien />,
          <Icons.LotteryTicket />,
        ),
        variant: "destructive",
      });
      return;
    }

    if (selectedUserLottery) {
      toast({
        description:
          dictionary.dashboard[
            "dashboard.actions.capital.casino.lottery.gift.toast.already-have"
          ],
        variant: "destructive",
      });
      return;
    }

    removeUserCurrency({
      currency: Currency.Ien,
      amount: lotteryPrice + deliveryPrice,
    });
    addUserLottery({ userId: selectedUser?.id });

    toast({
      description: formatString(
        dictionary.dashboard[
          "dashboard.actions.capital.casino.lottery.gift.toast.success"
        ],
        <Icons.LotteryTicket />,
      ),
    });
  };

  return (
    <div>
      <TypographyLarge>
        {
          dictionary.dashboard[
            "dashboard.actions.capital.casino.lottery.gift.label"
          ]
        }
      </TypographyLarge>
      <TypographyMuted>
        {formatString(
          dictionary.dashboard[
            "dashboard.actions.capital.casino.lottery.gift.description"
          ],
          <Icons.LotteryTicket />,
          deliveryPrice,
          <Icons.Ien />,
        )}
      </TypographyMuted>
      <div className="mt-5 flex flex-col gap-2">
        <UsersSelect
          className="max-w-[250px] justify-between"
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <Button
          variant="secondary"
          className="w-fit"
          disabled={!selectedUser}
          onClick={handleLotteryGift}
        >
          {
            dictionary.dashboard[
              "dashboard.actions.capital.casino.lottery.gift.button-label"
            ]
          }
        </Button>
      </div>
    </div>
  );
};

export default CasinoLotteryGift;
