import React from 'react'
import { Skeleton } from '../ui/skeleton';

const UserTitlesSkeleton = () => {
  return (
    <>
      <Skeleton className="h-[95px]" />
      <Skeleton className="h-[95px]" />
      <Skeleton className="h-[95px]" />
      <Skeleton className="h-[95px]" />
      <Skeleton className="h-[95px]" />
    </>
  );
}

export default UserTitlesSkeleton