"use client";

import { getWorldState } from "@/services/data-access/world-state";
import { WorldState } from "@prisma/client";
import { useEffect, useState } from "react";

const useWorldState = () => {
  const [worldState, setWorldState] = useState<WorldState>({
    id: "",
    season: "Any",
    weatherToday: "Any",
    weatherTomorrow: "Any",
  });

  useEffect(() => {
    getWorldState().then(setWorldState);
  }, []);

  return worldState;
};

export default useWorldState;
