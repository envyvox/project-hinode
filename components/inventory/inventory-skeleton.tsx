import { Skeleton } from "@/components/ui/skeleton";

const Component = () => {
  return (
    <div className="flex flex-col gap-5 rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
      <div className="flex gap-5">
        <Skeleton className="h-12 w-12" />
        <div className="w-1/2">
          <Skeleton className="h-[24px] w-full" />
          <Skeleton className="mt-1 h-[14px] w-1/2" />
        </div>
      </div>
    </div>
  );
};

const InventorySkeleton = () => {
  return (
    <>
      <Component />
      <Component />
      <Component />
    </>
  );
};

export default InventorySkeleton;
