import { Locale } from "@/i18n-config";
import { create } from "zustand";

type LangState = {
  lang: Locale;
  setLang: (lang: Locale) => void;
  getLang: () => void;
};

export const useLangStore = create<LangState>((set) => ({
  lang: "en",
  setLang: (lang: Locale) => {
    set({ lang });
    localStorage.setItem("locale", lang);
  },
  getLang: () => {
    const lang = (localStorage.getItem("locale") as Locale) ?? "en";
    set({ lang });
  },
}));
