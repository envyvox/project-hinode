import { Skeleton } from "@/components/ui/skeleton";

const FarmDynamicCellSkeleton = () => {
  return (
    <>
      <Skeleton className="h-[28px] w-2/3" />
      <Skeleton className="mt-2 h-[14px] w-3/4" />
      <Skeleton className="mt-4 h-[14px] w-[268px]" />
      <Skeleton className="mt-1 h-[14px] w-1/3" />
      <Skeleton className="mt-4 h-[40px] w-[268px]" />
    </>
  );
};

export default FarmDynamicCellSkeleton;
