"use client";

import { useEffect } from "react";
import { useDictionaryStore } from "@/store/dictionary-store";
import { useLangStore } from "@/store/lang-store";

import { getDictionary } from "@/app/dictionaries";

type Props = {
  children: React.ReactNode;
};

const DictionaryProvider = ({ children }: Props) => {
  const lang = useLangStore((state) => state.lang);
  const setDictionary = useDictionaryStore((state) => state.setDictionary);

  useEffect(() => {
    const loadData = async () => {
      const dictionary = await getDictionary(lang);
      setDictionary(dictionary);
    };
    loadData();
  }, [lang, setDictionary]);

  return children;
};

export default DictionaryProvider;
