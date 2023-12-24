import { useState } from "react";
import Image from "next/image";
import { useDictionaryStore } from "@/store/dictionary-store";
import { Seed } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { useUserSeedsQuery } from "@/hooks/queries/use-user-seeds-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  selectedSeed: Seed | undefined;
  setSelectedSeed: React.Dispatch<React.SetStateAction<Seed | undefined>>;
};

const SeedsSelect = ({ selectedSeed, setSelectedSeed }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: userSeeds } = useUserSeedsQuery();
  const [open, setOpen] = useState(false);
  const seedMap = new Map(
    userSeeds?.map((userSeed) => [userSeed.seed.id, userSeed.seed])
  );

  return (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedSeed ? (
            <div className="flex items-center">
              <Image
                className="mr-2 inline h-6 w-6"
                width={27}
                height={27}
                src={`/seed/${selectedSeed.name}.png`}
                alt={selectedSeed.name}
              />
              {/* @ts-ignore Impilicit any */}
              {dictionary.item.seed[selectedSeed.name]}
            </div>
          ) : (
            dictionary.dashboard["seeds-select.not-selected"]
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="popover-content p-0">
        <Command
          filter={(value, search) => {
            const seed = seedMap.get(value);
            // @ts-ignore Implicit any
            const localizedName = dictionary.item.seed[seed?.name];
            const match =
              seed?.name.toLowerCase().includes(search.toLowerCase()) ||
              localizedName?.toLowerCase().includes(search.toLowerCase());

            return match ? 1 : 0;
          }}
        >
          <CommandInput
            placeholder={dictionary.dashboard["seeds-select.search.label"]}
          />
          <CommandEmpty>
            {dictionary.dashboard["seeds-select.search.empty"]}
          </CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-96">
              {userSeeds?.map((userSeed) => (
                <CommandItem
                  key={userSeed.seedId}
                  value={userSeed.seedId}
                  onSelect={() => {
                    setSelectedSeed(userSeed.seed);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedSeed?.id === userSeed.seedId
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <Image
                    className="mr-2 inline h-6 w-6"
                    width={27}
                    height={27}
                    src={`/seed/${userSeed.seed.name}.png`}
                    alt={userSeed.seed.name}
                  />
                  {/* @ts-ignore Impilicit any */}
                  {dictionary.item.seed[userSeed.seed.name]}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SeedsSelect;
