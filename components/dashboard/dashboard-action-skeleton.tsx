import { Skeleton } from "../ui/skeleton";

const DashboardActionSkeleton = () => (
  <>
    <Skeleton className="h-[200px] w-[200px]" />
    <div className="flex flex-1 flex-col justify-between">
      <div>
        <Skeleton className="h-[28px] w-[250px]" />
        <div>
          <Skeleton className="mt-8 h-[20px] w-full" />
          <Skeleton className="mt-2 h-[20px] w-full" />
          <Skeleton className="mt-2 h-[20px] w-2/3" />
        </div>
      </div>
      <Skeleton className="h-10 w-[200px] self-end" />
    </div>
  </>
);

export default DashboardActionSkeleton;
