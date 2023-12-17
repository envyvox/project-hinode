"use client";

import { useWorldStateStore } from "@/store/world-state-store";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const WorldStateProvider = ({ children }: Props) => {
  const getWorldState = useWorldStateStore((state) => state.getWorldState);

  useEffect(() => {
    getWorldState();
  }, [getWorldState]);

  return children;
};

export default WorldStateProvider;
