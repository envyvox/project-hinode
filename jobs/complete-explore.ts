import { addGatheringToUser } from "@/services/data-access/gathering";
import { addXpToUser, updateUserLocation } from "@/services/data-access/user";
import { SuccessGathering } from "@/store/job-store";
import { client } from "@/trigger";
import { eventTrigger } from "@trigger.dev/sdk";

client.defineJob({
  id: "complete-explore",
  name: "Complete Explore",
  version: "0.0.1",
  trigger: eventTrigger({
    name: "complete-explore",
  }),
  run: async (payload, io, cxt) => {
    await io.runTask("add-gatherings-to-user", async () => {
      const gatherings: SuccessGathering[] = payload.gatherings;
      if (!gatherings) return;

      gatherings.forEach(async (gathering) => {
        await addGatheringToUser(
          payload.userId,
          gathering.gatheringId,
          gathering.amount,
        );
      });
    });

    await io.runTask("add-xp-to-user", async () => {
      // TODO: move this magic 20 to database prop
      return await addXpToUser(payload.userId, 20);
    });

    await io.runTask("update-user-location", async () => {
      return await updateUserLocation(payload.userId, payload.returnLocation);
    });
  },
});
