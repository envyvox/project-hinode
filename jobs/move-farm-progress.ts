import { getFarmCellsWithState } from "@/services/data-access/farm";
import { getWorldState } from "@/services/data-access/world-state";
import { client } from "@/trigger";
import { FarmCellState, Weather } from "@prisma/client";
import { cronTrigger } from "@trigger.dev/sdk";

import prisma from "@/lib/prisma";

client.defineJob({
  id: "move-farm-progress",
  name: "Move farm progress",
  version: "0.0.2",
  trigger: cronTrigger({ cron: "0 0 * * *" }),
  enabled: process.env.TRIGGER_JOBS_DISABLED === "false",
  run: async (payload, io, cxt) => {
    const worldState = await io.runTask(
      "get-world-state",
      async () => await getWorldState()
    );

    const cells = await io.runTask(
      "get-watered-cells",
      async () => await getFarmCellsWithState(FarmCellState.Watered)
    );

    await io.runTask("update-cells", async () => {
      for (const cell of cells) {
        if (!cell.seed) {
          await io.logger.error(
            `There are cell with watered state but seed is undefined: ${cell.id}`
          );
          return;
        }

        const newProgress = cell.progress + 1;

        const growthDays = cell.inReGrowth
          ? cell.seed.reGrowthDays
          : cell.seed.growthDays;

        const isCompleted = newProgress >= growthDays;

        const newState = isCompleted
          ? FarmCellState.Completed
          : worldState.weatherToday === Weather.Clear
            ? FarmCellState.Planted
            : FarmCellState.Watered;

        io.runTask(`update-cell-${cell.id}`, async () => {
          io.logger.info("Updating cell:", cell);
          return await prisma.userFarmCell.update({
            where: {
              id: cell.id,
            },
            data: {
              state: newState,
              progress: newProgress,
            },
          });
        });
      }
    });
  },
});
