"use client";

import ExploreProvider from "@/services/providers/explore-provider";
import FishingProvider from "@/services/providers/fishing-provider";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const GameProviders = ({ children }: Props) => {
  return (
    <FishingProvider>
      <ExploreProvider>{children}</ExploreProvider>
    </FishingProvider>
  );
};

export default GameProviders;
