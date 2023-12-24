import DashboardActionSkeleton from "./dashboard-action-skeleton";

const DashboardTransitSkeleton = () => {
  return (
    <>
      <div className="flex flex-wrap gap-5 border-t pt-5">
        <DashboardActionSkeleton />
      </div>
      <div className="flex flex-wrap gap-5 border-t pt-5">
        <DashboardActionSkeleton />
      </div>
      <div className="flex flex-wrap gap-5 border-t pt-5">
        <DashboardActionSkeleton />
      </div>
    </>
  );
};

export default DashboardTransitSkeleton;
