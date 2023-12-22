"use server";

import { SuccessGathering } from "@/store/explore-job-store";
import { client } from "@/trigger";
import { Location } from "@prisma/client";

export async function sendEventFishing(
  userId: string,
  fishId: string,
  deliverAt: Date,
): Promise<string> {
  const event = await client.sendEvent(
    {
      name: "complete-fishing",
      payload: {
        userId: userId,
        fishId: fishId,
      },
    },
    {
      deliverAt: deliverAt,
    },
  );
  return event.id;
}

export async function sendEventExplore(
  userId: string,
  gatherings: SuccessGathering[],
  returnLocation: Location,
  deliverAt: Date,
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
    {
      deliverAt: deliverAt,
    },
  );
  return event.id;
}
