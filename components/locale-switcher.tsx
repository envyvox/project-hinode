"use client";

import { i18n } from "@/i18n-config";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useLangStore } from "@/store/lang-store";

const LocaleSwitcher = () => {
  const setLang = useLangStore((state) => state.setLang);
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {dictionary.header["langulage-switcher.langulage"]}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {i18n.locales.map((locale) => (
          <DropdownMenuItem key={locale} onClick={() => setLang(locale)}>
            {locale}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleSwitcher;
