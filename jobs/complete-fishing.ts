import { eventTrigger } from "@trigger.dev/sdk";
import { client } from "@/trigger";
import { addFishToUser } from "@/data-access/fish";
import { Location } from "@prisma/client";
import { updateUserLocation } from "@/data-access/user";

client.defineJob({
  id: "complete-fishing",
  name: "Complete Fishing",
  version: "0.0.4",
  trigger: eventTrigger({
    name: "complete-fishing",
  }),
  run: async (payload, io, ctx) => {
    await io.runTask("add-fish-to-user", async () => {
      await addFishToUser(payload.userId, payload.fishId, 1);
    });

    await io.runTask("update-user-location", async () => {
      await updateUserLocation(payload.userId, Location.Seaport);
    });
  },
});
