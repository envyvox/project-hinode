import {
  HexGridContent,
  HexGridItem,
  HexGridList,
} from "@/components/ui/hex-grid";

const FarmSkeleton = () => {
  return (
    <HexGridList>
      <HexGridItem>
        <HexGridContent className="animate-pulse bg-muted dark:bg-muted">
          {null}
        </HexGridContent>
      </HexGridItem>
      <HexGridItem>
        <HexGridContent className="animate-pulse bg-muted dark:bg-muted">
          {null}
        </HexGridContent>
      </HexGridItem>
      <HexGridItem>
        <HexGridContent className="animate-pulse bg-muted dark:bg-muted">
          {null}
        </HexGridContent>
      </HexGridItem>
      <HexGridItem>
        <HexGridContent className="animate-pulse bg-muted dark:bg-muted">
          {null}
        </HexGridContent>
      </HexGridItem>
      <HexGridItem>
        <HexGridContent className="animate-pulse bg-muted dark:bg-muted">
          {null}
        </HexGridContent>
      </HexGridItem>
      <HexGridItem>
        <HexGridContent className="animate-pulse bg-muted dark:bg-muted">
          {null}
        </HexGridContent>
      </HexGridItem>
      <HexGridItem>
        <HexGridContent className="animate-pulse bg-muted dark:bg-muted">
          {null}
        </HexGridContent>
      </HexGridItem>
    </HexGridList>
  );
};

export default FarmSkeleton;
