"use client";

import ExploreProvider from "@/services/providers/explore-provider";
import FishingProvider from "@/services/providers/fishing-provider";
import UserItemsProvider from "@/services/providers/user-items-provider";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const GameProviders = ({ children }: Props) => {
  return (
    <UserItemsProvider>
      <FishingProvider>
        <ExploreProvider>{children}</ExploreProvider>
      </FishingProvider>
    </UserItemsProvider>
  );
};

export default GameProviders;
