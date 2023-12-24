import { Location } from "@prisma/client";
import React from "react";
import { Locale } from "i18n-config";
import dynamic from "next/dynamic";
import DashboardAboutSkeleton from "./dashboard-about-skeleton";

type LocationAbouts = {
  [lang in Locale]: {
    [location in Location]: React.ComponentType<{}>;
  };
};

const abouts: LocationAbouts = {
  en: {
    InTransit: dynamic(() => import("@/mdx/locations/en/InTransit.mdx"), {
      loading: DashboardAboutSkeleton,
    }),
    Capital: dynamic(() => import("@/mdx/locations/en/Capital.mdx"), {
      loading: DashboardAboutSkeleton,
    }),
    Garden: dynamic(() => import("@/mdx/locations/en/Garden.mdx"), {
      loading: DashboardAboutSkeleton,
    }),
    Seaport: dynamic(() => import("@/mdx/locations/en/Seaport.mdx"), {
      loading: DashboardAboutSkeleton,
    }),
    Castle: dynamic(() => import("@/mdx/locations/en/Castle.mdx"), {
      loading: DashboardAboutSkeleton,
    }),
    Village: dynamic(() => import("@/mdx/locations/en/Village.mdx"), {
      loading: DashboardAboutSkeleton,
    }),
    ExploreGarden: dynamic(
      () => import("@/mdx/locations/en/ExploreGarden.mdx"),
      {
        loading: DashboardAboutSkeleton,
      },
    ),
    ExploreCastle: dynamic(
      () => import("@/mdx/locations/en/ExploreCastle.mdx"),
      {
        loading: DashboardAboutSkeleton,
      },
    ),
    Fishing: dynamic(() => import("@/mdx/locations/en/Fishing.mdx"), {
      loading: DashboardAboutSkeleton,
    }),
    FieldWatering: dynamic(
      () => import("@/mdx/locations/en/FieldWatering.mdx"),
      {
        loading: DashboardAboutSkeleton,
      },
    ),
    WorkOnContract: dynamic(
      () => import("@/mdx/locations/en/WorkOnContract.mdx"),
      {
        loading: DashboardAboutSkeleton,
      },
    ),
  },
  ru: {
    InTransit: dynamic(() => import("@/mdx/locations/ru/InTransit.mdx"), {
      loading: DashboardAboutSkeleton,
    }),
    Capital: dynamic(() => import("@/mdx/locations/ru/Capital.mdx"), {
      loading: DashboardAboutSkeleton,
    }),
    Garden: dynamic(() => import("@/mdx/locations/ru/Garden.mdx"), {
      loading: DashboardAboutSkeleton,
    }),
    Seaport: dynamic(() => import("@/mdx/locations/ru/Seaport.mdx"), {
      loading: DashboardAboutSkeleton,
    }),
    Castle: dynamic(() => import("@/mdx/locations/ru/Castle.mdx"), {
      loading: DashboardAboutSkeleton,
    }),
    Village: dynamic(() => import("@/mdx/locations/ru/Village.mdx"), {
      loading: DashboardAboutSkeleton,
    }),
    ExploreGarden: dynamic(
      () => import("@/mdx/locations/ru/ExploreGarden.mdx"),
      {
        loading: DashboardAboutSkeleton,
      },
    ),
    ExploreCastle: dynamic(
      () => import("@/mdx/locations/ru/ExploreCastle.mdx"),
      {
        loading: DashboardAboutSkeleton,
      },
    ),
    Fishing: dynamic(() => import("@/mdx/locations/ru/Fishing.mdx"), {
      loading: DashboardAboutSkeleton,
    }),
    FieldWatering: dynamic(
      () => import("@/mdx/locations/ru/FieldWatering.mdx"),
      {
        loading: DashboardAboutSkeleton,
      },
    ),
    WorkOnContract: dynamic(
      () => import("@/mdx/locations/ru/WorkOnContract.mdx"),
      {
        loading: DashboardAboutSkeleton,
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
