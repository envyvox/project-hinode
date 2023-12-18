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
  version: "0.0.1",
  trigger: cronTrigger({
    cron: "0 0 1 * *",
  }),
  run: async (payload, io, cxt) => {
    const worldState = await getWorldState();
    const nextSeason = getNextSeason(worldState.season);

    await io.runTask("update-season", async () => {
      await updateSeason(nextSeason);
    });
  },
});
