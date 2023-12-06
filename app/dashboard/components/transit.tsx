import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getTransitsFromLocation } from "@/lib/game/transit";
import { useUserStore } from "@/store/user-store";
import { Transit } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import IenIcon from "@/public/currency/Ien.png";
import { useDictionaryStore } from "@/store/dictionary-store";
import { formatString } from "@/lib/format-string";

export default function DashboardTransit() {
  const dictionary = useDictionaryStore((state) => state.dictionary);
  const userLocation = useUserStore((state) => state.user.location);
  const setUserLocation = useUserStore((state) => state.setUserLocation);
  const [transits, setTransits] = useState<Transit[]>([]);

  useEffect(() => {
    getTransitsFromLocation(userLocation).then((transits) =>
      setTransits(transits),
    );
  }, [userLocation]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.dashboard["dashboard.transit.title"]}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {transits.length > 0 ? (
          transits.map((transit) => (
            <div
              key={transit.id}
              className="flex flex-wrap justify-between gap-5 border-t pt-5"
            >
              <Image
                className="h-[200px] w-[200px] rounded-xl object-cover"
                src={`/location/${transit.destination}.png`}
                width={1100}
                height={150}
                alt={transit.destination}
              />
              <div className="flex items-end gap-2">
                <Button
                  className="flex h-fit flex-wrap"
                  variant="secondary"
                  onClick={() => setUserLocation(transit.destination)}
                >
                  {formatString(
                    dictionary.dashboard["dashboard.transit.button"],
                    // @ts-ignore Imlicit any
                    dictionary.location[transit.destination],
                    transit.price,
                    <Image className="mx-1 h-6 w-6" src={IenIcon} alt="Ien" />,
                  )}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <>
            <Skeleton className="h-[210px]" />
            <Skeleton className="h-[210px]" />
            <Skeleton className="h-[210px]" />
          </>
        )}
      </CardContent>
    </Card>
  );
}
