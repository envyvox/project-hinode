import { Skeleton } from "../ui/skeleton";

const Component = () => {
  return (
    <>
      <div className="flex w-full items-center gap-5 rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
        <Skeleton className="h-8 w-8" />
        <div className="flex w-2/3 flex-col gap-2">
          <Skeleton className="h-[24px] w-2/3" />
          <Skeleton className="h-[20px] w-full" />
        </div>
      </div>
    </>
  );
};

const UserTitlesSkeleton = ({ single }: { single?: boolean }) => {
  return single ? (
    <Component />
  ) : (
    <>
      <Component />
      <Component />
      <Component />
      <Component />
      <Component />
    </>
  );
};

export default UserTitlesSkeleton;
