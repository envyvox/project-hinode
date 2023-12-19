import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ShopFisherSkeleton = () => {
  return (
    <>
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-36 w-full" />
    </>
  );
};

export default ShopFisherSkeleton;
