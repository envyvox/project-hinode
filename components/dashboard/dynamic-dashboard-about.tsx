import { Location } from "@prisma/client";
import React from "react";
import { Locale } from "i18n-config";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

type LocationAbouts = {
  [lang in Locale]: {
    [location in Location]: React.ComponentType<{}>;
  };
};

const aboutLoading = () => <Skeleton className="mt-6 h-[150px] w-full" />;

const abouts: LocationAbouts = {
  en: {
    InTransit: dynamic(() => import("@/mdx/locations/en/InTransit.mdx"), {
      loading: aboutLoading,
    }),
    Capital: dynamic(() => import("@/mdx/locations/en/Capital.mdx"), {
      loading: aboutLoading,
    }),
    Garden: dynamic(() => import("@/mdx/locations/en/Garden.mdx"), {
      loading: aboutLoading,
    }),
    Seaport: dynamic(() => import("@/mdx/locations/en/Seaport.mdx"), {
      loading: aboutLoading,
    }),
    Castle: dynamic(() => import("@/mdx/locations/en/Castle.mdx"), {
      loading: aboutLoading,
    }),
    Village: dynamic(() => import("@/mdx/locations/en/Village.mdx"), {
      loading: aboutLoading,
    }),
    ExploreGarden: dynamic(
      () => import("@/mdx/locations/en/ExploreGarden.mdx"),
      {
        loading: aboutLoading,
      },
    ),
    ExploreCastle: dynamic(
      () => import("@/mdx/locations/en/ExploreCastle.mdx"),
      {
        loading: aboutLoading,
      },
    ),
    Fishing: dynamic(() => import("@/mdx/locations/en/Fishing.mdx"), {
      loading: aboutLoading,
    }),
    FieldWatering: dynamic(
      () => import("@/mdx/locations/en/FieldWatering.mdx"),
      {
        loading: aboutLoading,
      },
    ),
    WorkOnContract: dynamic(
      () => import("@/mdx/locations/en/WorkOnContract.mdx"),
      {
        loading: aboutLoading,
      },
    ),
  },
  ru: {
    InTransit: dynamic(() => import("@/mdx/locations/ru/InTransit.mdx"), {
      loading: aboutLoading,
    }),
    Capital: dynamic(() => import("@/mdx/locations/ru/Capital.mdx"), {
      loading: aboutLoading,
    }),
    Garden: dynamic(() => import("@/mdx/locations/ru/Garden.mdx"), {
      loading: aboutLoading,
    }),
    Seaport: dynamic(() => import("@/mdx/locations/ru/Seaport.mdx"), {
      loading: aboutLoading,
    }),
    Castle: dynamic(() => import("@/mdx/locations/ru/Castle.mdx"), {
      loading: aboutLoading,
    }),
    Village: dynamic(() => import("@/mdx/locations/ru/Village.mdx"), {
      loading: aboutLoading,
    }),
    ExploreGarden: dynamic(
      () => import("@/mdx/locations/ru/ExploreGarden.mdx"),
      {
        loading: aboutLoading,
      },
    ),
    ExploreCastle: dynamic(
      () => import("@/mdx/locations/ru/ExploreCastle.mdx"),
      {
        loading: aboutLoading,
      },
    ),
    Fishing: dynamic(() => import("@/mdx/locations/ru/Fishing.mdx"), {
      loading: aboutLoading,
    }),
    FieldWatering: dynamic(
      () => import("@/mdx/locations/ru/FieldWatering.mdx"),
      {
        loading: aboutLoading,
      },
    ),
    WorkOnContract: dynamic(
      () => import("@/mdx/locations/ru/WorkOnContract.mdx"),
      {
        loading: aboutLoading,
      },
    ),
  },
};

type Props = {
  lang: Locale;
  userLocation: Location;
};

const DynamicDashboardAbout = ({ lang, userLocation }: Props) => {
  const DynamicComponent = abouts[lang][userLocation];
  return <DynamicComponent />;
};

export default DynamicDashboardAbout;
