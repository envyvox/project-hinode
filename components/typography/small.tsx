type Props = {
  children: React.ReactNode;
};

const TypographySmall = ({ children }: Props) => (
  <small className="text-sm font-medium leading-none">{children}</small>
);

export default TypographySmall;
