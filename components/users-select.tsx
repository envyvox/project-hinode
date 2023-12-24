import { Dispatch, SetStateAction, useState } from "react";
import { GameUser } from "@/services/data-access/user";
import { useDictionaryStore } from "@/store/dictionary-store";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { useUsersQuery } from "@/hooks/queries/use-users-query";

import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selectedUser: GameUser | undefined;
  setSelectedUser: Dispatch<SetStateAction<GameUser | undefined>>;
}

const UsersSelect = ({ selectedUser, setSelectedUser, ...props }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const [open, setOpen] = useState(false);
  const { data: users } = useUsersQuery();
  const userMap = new Map(users?.map((user) => [user.id, user]));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          {...props}
        >
          {selectedUser
            ? users?.find((user) => user.id === selectedUser.id)?.displayName
            : dictionary.dashboard["users-select.not-selected"]}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="popover-content p-0">
        <Command
          filter={(value, search) => {
            const user = userMap.get(value);
            const match = user?.displayName
              ?.toLowerCase()
              .includes(search.toLowerCase());

            return match ? 1 : 0;
          }}
        >
          <CommandInput
            placeholder={dictionary.dashboard["users-select.search.label"]}
          />
          <CommandEmpty>
            {dictionary.dashboard["users-select.search.empty"]}
          </CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-96">
              {users?.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.id}
                  onSelect={(currentValue) => {
                    const selectedUser = users.find(
                      (u) => u.id === currentValue
                    );

                    setSelectedUser(selectedUser);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedUser?.id === user.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {user.displayName}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default UsersSelect;
