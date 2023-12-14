"use client";

import { getDictionary } from "@/app/dictionaries";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useLangStore } from "@/store/lang-store";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function DictionaryProvider({ children }: Props) {
  const lang = useLangStore((state) => state.lang);
  const setDictionary = useDictionaryStore((state) => state.setDictionary);

  useEffect(() => {
    getDictionary(lang).then((dictionary) => setDictionary(dictionary));
  }, [lang, setDictionary]);

  return children;
}
