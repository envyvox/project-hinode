type Props = {
  children: React.ReactNode;
};

const TypographyH1 = ({ children }: Props) => (
  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    {children}
  </h1>
);

export default TypographyH1;
