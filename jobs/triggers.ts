"use server";

import { client } from "@/trigger";

export async function sendEventFishing(
  userId: string,
  fishId: string,
): Promise<string> {
  const event = await client.sendEvent(
    { name: "complete-fishing", payload: { userId: userId, fishId: fishId } },
    // { deliverAfter: 20 },
  );
  return event.id;
}
