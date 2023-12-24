import { cn } from "@/lib/utils";

type HexGridListProps = {
  className?: string;
  children: React.ReactNode;
};

const HexGridList = ({ className, children }: HexGridListProps) => {
  return (
    <ul
      className={cn(
        "hex-grid__list gap relative m-0 grid list-none p-0",
        className
      )}
    >
      {children}
    </ul>
  );
};

type HexGridItemProps = {
  className?: string;
  children: React.ReactNode;
};

const HexGridItem = ({ className, children }: HexGridItemProps) => {
  return (
    <li className={cn("hex-grid__item relative h-0 pb-[90%]", className)}>
      {children}
    </li>
  );
};

type HexGridContentProps = {
  className?: string;
  children: React.ReactNode;
};

const HexGridContent = ({ className, children }: HexGridContentProps) => {
  return (
    <div
      className={cn(
        "hex-grid__content absolute flex h-full w-full flex-col items-center justify-center bg-secondary text-center text-card-foreground transition-colors hover:bg-secondary-foreground/5 dark:bg-card dark:hover:bg-primary-foreground/90",
        className
      )}
    >
      {children}
    </div>
  );
};

export { HexGridList, HexGridItem, HexGridContent };
