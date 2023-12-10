import { TypographyH4 } from "@/components/typography/h4";
import { TypographyP } from "@/components/typography/p";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  label: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;
};

export default function ActionBase({
  label,
  description,
  buttonLabel,
  onClick,
}: Props) {
  return (
    <>
      {/* TODO: Replace skeleton with Image */}
      <Skeleton className="h-[200px] w-[200px]" />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <TypographyH4>{label}</TypographyH4>
          <TypographyP>{description}</TypographyP>
        </div>
        <Button
          className="mt-2 w-fit self-end"
          variant="secondary"
          onClick={onClick}
        >
          {buttonLabel}
        </Button>
      </div>
    </>
  );
}
