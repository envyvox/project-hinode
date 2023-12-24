import { addFishToUser } from "@/services/data-access/fish";
import { addXpToUser, updateUserLocation } from "@/services/data-access/user";
import { client } from "@/trigger";
import { Location } from "@prisma/client";
import { eventTrigger } from "@trigger.dev/sdk";

client.defineJob({
  id: "complete-fishing",
  name: "Complete Fishing",
  version: "0.0.6",
  trigger: eventTrigger({
    name: "complete-fishing",
  }),
  run: async (payload, io, ctx) => {
    await io.runTask("add-fish-to-user", async () => {
      return await addFishToUser(payload.userId, payload.fishId, 1);
    });

    await io.runTask("add-xp-to-user", async () => {
      // TODO: move this magic 20 to database prop
      return await addXpToUser(payload.userId, 20);
    });

    await io.runTask("update-user-location", async () => {
      return await updateUserLocation(payload.userId, Location.Seaport);
    });
  },
});
