import { Skeleton } from "@/components/ui/skeleton";

const InventorySkeleton = () => {
  return (
    <>
      <Skeleton className="h-[90px]" />
      <Skeleton className="h-[90px]" />
      <Skeleton className="h-[90px]" />
      <Skeleton className="h-[90px]" />
    </>
  );
};

export default InventorySkeleton;
