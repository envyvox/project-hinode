type Props = {
  children: React.ReactNode;
};

const TypographyInlineCode = ({ children }: Props) => (
  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
    {children}
  </code>
);

export default TypographyInlineCode;
