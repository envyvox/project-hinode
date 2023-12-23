import { Skeleton } from "./ui/skeleton";

type Props = {
  cols: number;
};

const renderColumns = (cols: number) => {
  return Array.from({ length: 10 }, (_, rowIndex) => (
    <tr key={rowIndex}>
      {Array.from({ length: cols }, (_, colIndex) => (
        <td key={colIndex}>
          <Skeleton className="m-4 h-[39px]" />
        </td>
      ))}
    </tr>
  ));
};

const DataTableSkeleton = ({ cols }: Props) => {
  return <>{renderColumns(cols)}</>;
};

export default DataTableSkeleton;
