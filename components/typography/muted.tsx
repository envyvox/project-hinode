type Props = {
  children: React.ReactNode;
};

export function TypographyMuted({ children }: Props) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}
