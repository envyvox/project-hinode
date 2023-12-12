import { TypographyH4 } from "@/components/typography/h4";
import { TypographyP } from "@/components/typography/p";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode } from "react";

type Props = {
  label: string;
  description: string;
  actionComponent: ReactNode;
};

export default function ActionBase({
  label,
  description,
  actionComponent,
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
        {actionComponent}
      </div>
    </>
  );
}
