"use server";

import { SuccessGathering } from "@/store/job-store";
import { client } from "@/trigger";
import { Location } from "@prisma/client";

export async function sendEventFishing(
  userId: string,
  fishId: string,
): Promise<string> {
  const event = await client.sendEvent(
    {
      name: "complete-fishing",
      payload: {
        userId: userId,
        fishId: fishId,
      },
    },
    // TODO: add deliverAfter
  );
  return event.id;
}

export async function sendEventExplore(
  userId: string,
  gatherings: SuccessGathering[],
  returnLocation: Location,
): Promise<string> {
  const event = await client.sendEvent(
    {
      name: "complete-explore",
      payload: {
        userId: userId,
        gatherings: gatherings,
        returnLocation: returnLocation,
      },
    },
    // TODO: add deliverAfter
  );
  return event.id;
}
