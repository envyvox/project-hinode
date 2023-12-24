import { Skeleton } from "../ui/skeleton";

const DashboardAboutSkeleton = () => {
  return (
    <>
      <Skeleton className="mt-8 h-[20px] w-full" />
      <Skeleton className="mt-2 h-[20px] w-full" />
      <Skeleton className="mt-2 h-[20px] w-2/3" />
      <Skeleton className="mt-8 h-[20px] w-full" />
      <Skeleton className="mt-2 h-[20px] w-full" />
      <Skeleton className="mt-2 h-[20px] w-full" />
      <Skeleton className="mt-2 h-[20px] w-full" />
      <Skeleton className="mt-2 h-[20px] w-2/3" />
    </>
  );
};

export default DashboardAboutSkeleton;
