import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const InventorySkeleton = () => {
  return (
    <>
      <Skeleton className="h-[85px] flex-1" />
      <Skeleton className="h-[85px] flex-1" />
    </>
  );
};

export default InventorySkeleton;
