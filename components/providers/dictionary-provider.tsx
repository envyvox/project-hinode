"use client";

import { Dictionary, useDictionaryStore } from "@/store/dictionary-store";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  dictionary: Dictionary;
}; 

export default function DictionaryProvider({ children, dictionary }: Props) {
  const setDictionary = useDictionaryStore((state) => state.setDictionary);

  useEffect(() => {
    setDictionary(dictionary);
  }, [dictionary]);

  return children;
}
