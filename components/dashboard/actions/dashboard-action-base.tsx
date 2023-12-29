import { Skeleton } from "@/components/ui/skeleton";
import TypographyH4 from "@/components/typography/h4";
import TypographyP from "@/components/typography/p";

type Props = {
  label: string;
  description: string;
  actionComponent: React.ReactNode;
};

const DashboardActionBase = ({
  label,
  description,
  actionComponent,
}: Props) => {
  return (
    <div className="flex flex-wrap gap-5 border-t pt-5">
      {/* TODO: Replace skeleton with Image */}
      <Skeleton className="h-[200px] w-[200px]" />
      <div className="flex flex-1 flex-col justify-between">
        <>
          <TypographyH4>{label}</TypographyH4>
          <TypographyP>{description}</TypographyP>
        </>
        {actionComponent}
      </div>
    </div>
  );
};

export default DashboardActionBase;
