import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function TypographyLarge({ children }: Props) {
  return <div className="text-lg font-semibold">{children}</div>;
}
