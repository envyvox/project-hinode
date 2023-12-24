import dynamic from "next/dynamic";
import { UserFarmCellSeedIncluded } from "@/services/data-access/farm";
import { FarmCellState } from "@prisma/client";

import FarmDynamicCellSkeleton from "./farm-dynamic-cell-skeleton";

type Props = {
  cell: UserFarmCellSeedIncluded;
};

type CellComponents = {
  [key in FarmCellState]: React.ComponentType<{
    cell: UserFarmCellSeedIncluded;
  }>;
};

const cellComponents: CellComponents = {
  Empty: dynamic(() => import("./farm-cell-content-empty"), {
    loading: () => <FarmDynamicCellSkeleton />,
  }),
  Planted: dynamic(() => import("./farm-cell-content-planted"), {
    loading: () => <FarmDynamicCellSkeleton />,
  }),
  Watered: dynamic(() => import("./farm-cell-content-watered"), {
    loading: () => <FarmDynamicCellSkeleton />,
  }),
  Completed: dynamic(() => import("./farm-cell-content-completed"), {
    loading: () => <FarmDynamicCellSkeleton />,
  }),
};

const FarmDymanicCellContent = ({ cell }: Props) => {
  const DynamicComponent = cellComponents[cell.state];
  return <DynamicComponent cell={cell} />;
};

export default FarmDymanicCellContent;
