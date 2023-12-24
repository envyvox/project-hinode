import { cn } from "@/lib/utils";

type HexGridListProps = {
  className?: string;
  children: React.ReactNode;
};

const HexGridList = ({ className, children }: HexGridListProps) => {
  return <ul className={cn("hex-grid__list", className)}>{children}</ul>;
};

type HexGridItemProps = {
  className?: string;
  children: React.ReactNode;
};

const HexGridItem = ({ className, children }: HexGridItemProps) => {
  return <li className={cn("hex-grid__item", className)}>{children}</li>;
};

type HexGridContentProps = {
  className?: string;
  children: React.ReactNode;
};

const HexGridContent = ({ className, children }: HexGridContentProps) => {
  return <div className={cn("hex-grid__content", className)}>{children}</div>;
};

export { HexGridList, HexGridItem, HexGridContent };
