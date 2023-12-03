"use server";

import { profileScheme } from "@/lib/zod-schemes";

/**
 * Updates user info
 * @param userId User id
 * @param formData Form Data
 */
export async function updateUserInfo(userId: string, formData: FormData) {
  const data = profileScheme.parse({
    about: formData.get("about"),
  });

  await prisma?.user.update({
    where: {
      id: userId,
    },
    data: {
      about: data.about,
    },
  });
}
