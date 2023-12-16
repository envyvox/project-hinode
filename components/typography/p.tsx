type Props = {
  children: React.ReactNode;
};

const TypographyP = ({ children }: Props) => (
  <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
);

export default TypographyP;
