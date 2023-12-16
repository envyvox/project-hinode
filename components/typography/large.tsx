type Props = {
  children: React.ReactNode;
};

export function TypographyLarge({ children }: Props) {
  return (
    <div className="text-lg font-semibold" style={{ wordBreak: "break-word" }}>
      {children}
    </div>
  );
}
