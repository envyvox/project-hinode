import { useLangStore } from "@/store/lang-store";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

export default function LangProvider({ children }: Props) {
  const getLang = useLangStore((state) => state.getLang);

  useEffect(() => {
    getLang();
  }, []);

  return children;
}
