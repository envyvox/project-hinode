import { Transit } from "@prisma/client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import TypographyH4 from "@/components/typography/h4";
import TypographyP from "@/components/typography/p";
import { Button } from "@/components/ui/button";
import formatString from "@/util/format-string";
import { useDictionaryStore } from "@/store/dictionary-store";
import { IconIen } from "../icons";

type Props = {
  transit: Transit;
  handleTransit: (transit: Transit) => void;
};

const DashboardTransitItem = ({ transit, handleTransit }: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <div className="flex flex-wrap gap-5 border-t pt-5">
      {/* // TODO: Replace skeleton with Image */}
      <Skeleton className="h-[200px] w-[200px]" />
      <div className="flex flex-1 flex-col justify-between">
        <>
          <TypographyH4>
            {dictionary.location[transit.destination]}
          </TypographyH4>
          <TypographyP>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            ultrices nunc turpis, non consequat odio consequat a. Proin felis
            sapien, sagittis ac neque et, consequat lobortis est. In vel purus
            et magna vestibulum venenatis. Curabitur dictum est sed eleifend
            pulvinar.
          </TypographyP>
        </>
        <Button
          className="mt-2 w-fit self-end"
          variant="secondary"
          onClick={() => handleTransit(transit)}
        >
          {formatString(
            dictionary.dashboard["dashboard.transit.button"],
            transit.price,
            <IconIen />,
          )}
        </Button>
      </div>
    </div>
  );
};

export default DashboardTransitItem;
