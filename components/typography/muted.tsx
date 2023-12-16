type Props = {
  children: React.ReactNode;
};

const TypographyMuted = ({ children }: Props) => (
  <p className="text-sm text-muted-foreground">{children}</p>
);

export default TypographyMuted;
