import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardTransitSkeleton = () => {
  return (
    <>
      <Skeleton className="h-[210px]" />
      <Skeleton className="h-[210px]" />
      <Skeleton className="h-[210px]" />
    </>
  );
};

export default DashboardTransitSkeleton;
