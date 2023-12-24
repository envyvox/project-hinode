import { Skeleton } from "@/components/ui/skeleton";

const ShopSeedSkeleton = () => {
  return (
    <>
      <Skeleton className="h-[210px]" />
      <Skeleton className="col-span-1 h-[210px] sm:col-span-2" />
      <Skeleton className="h-[210px]" />
      <Skeleton className="h-[210px]" />
      <Skeleton className="h-[210px]" />
      <Skeleton className="h-[210px]" />
      <Skeleton className="h-[210px]" />
      <Skeleton className="col-span-1 h-[210px] sm:col-span-2" />
      <Skeleton className="h-[210px]" />
      <Skeleton className="h-[210px]" />
    </>
  );
};

export default ShopSeedSkeleton;
