import { useDictionaryStore } from "@/store/dictionary-store";

import { useTransitsQuery } from "@/hooks/queries/use-transits-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import DashboardTransitItem from "./dashboard-transit-item";
import DashboardTransitSkeleton from "./dashboard-transit-skeleton";

const DashboardTransit = () => {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const { data: transits, isLoading } = useTransitsQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.dashboard["transit.title"]}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {isLoading ? (
          <DashboardTransitSkeleton />
        ) : (
          transits?.map((transit) => (
            <DashboardTransitItem key={transit.id} transit={transit} />
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardTransit;
