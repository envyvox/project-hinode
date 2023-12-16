type Props = {
  children: React.ReactNode;
};

const TypographyLarge = ({ children }: Props) => (
  <div className="text-lg font-semibold" style={{ wordBreak: "break-word" }}>
    {children}
  </div>
);

export default TypographyLarge;
