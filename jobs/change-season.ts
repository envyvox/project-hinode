import {
  getWorldState,
  updateSeason,
} from "@/services/data-access/world-state";
import { client } from "@/trigger";
import { getNextSeason } from "@/util/get-next-season";
import { cronTrigger } from "@trigger.dev/sdk";

client.defineJob({
  id: "change-season",
  name: "Change season",
  version: "0.0.2",
  trigger: cronTrigger({
    cron: "0 0 1 * *",
  }),
  run: async (payload, io, cxt) => {
    const worldState = await io.runTask(
      "get-world-state",
      async () => await getWorldState()
    );

    await io.runTask("update-season", async () => {
      const nextSeason = getNextSeason(worldState.season);
      await updateSeason(nextSeason);
    });
  },
});
