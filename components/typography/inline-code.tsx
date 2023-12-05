import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function TypographyInlineCode({ children }: Props) {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
}
