import { Locale } from "@/i18n-config";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type LangState = {
  lang: Locale;
  setLang: (lang: Locale) => void;
};

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      lang: "ru",
      setLang: (lang: Locale) => {
        set({ lang });
      },
    }),
    {
      name: "lang-store",
    }
  )
);
