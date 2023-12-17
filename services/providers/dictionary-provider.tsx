"use client";

import { getDictionary } from "@/app/dictionaries";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useLangStore } from "@/store/lang-store";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const DictionaryProvider = ({ children }: Props) => {
  const lang = useLangStore((state) => state.lang);
  const setDictionary = useDictionaryStore((state) => state.setDictionary);

  useEffect(() => {
    getDictionary(lang).then(setDictionary);
  }, [lang, setDictionary]);

  return children;
};

export default DictionaryProvider;
