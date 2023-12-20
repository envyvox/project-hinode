import React from "react";
import { Skeleton } from "../ui/skeleton";

const UserBannersSkeleton = () => {
  return (
    <>
      <Skeleton className="h-[95px]" />
      <Skeleton className="h-[95px]" />
      <Skeleton className="h-[95px]" />
      <Skeleton className="h-[95px]" />
    </>
  );
};

export default UserBannersSkeleton;
