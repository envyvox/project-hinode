import { z } from "zod";

export const profileScheme = z.object({
  about: z.string(),
});
