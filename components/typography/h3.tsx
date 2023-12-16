type Props = {
  children: React.ReactNode;
};

const TypographyH3 = ({ children }: Props) => (
  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
    {children}
  </h3>
);

export default TypographyH3;
