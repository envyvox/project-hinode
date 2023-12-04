import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function TypographyMuted({ children }: Props) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}
