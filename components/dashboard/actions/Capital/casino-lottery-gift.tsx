import TypographyLarge from "@/components/typography/large";
import TypographyMuted from "@/components/typography/muted";
import { Button } from "@/components/ui/button";
import UsersSelect from "@/components/users-select";
import { GameUser } from "@/services/data-access/user";
import formatString from "@/util/format-string";
import { useState } from "react";
import { useDictionaryStore } from "@/store/dictionary-store";
import { IconIen, IconLotteryTicket } from "@/components/icons";

const deliveryPrice = 100;

const CasinoLotteryGift = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const [selectedUser, setSelectedUser] = useState<GameUser>();

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
          <IconLotteryTicket />,
          deliveryPrice,
          <IconIen />,
        )}
      </TypographyMuted>
      <div className="mt-5 flex flex-col gap-2">
        <UsersSelect
          className="max-w-[250px] justify-between"
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <Button variant="secondary" className="w-fit" disabled={!selectedUser}>
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
