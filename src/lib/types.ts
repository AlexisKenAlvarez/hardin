import { z } from "zod";

export const ZodCategory = z.object({
  id: z.number(),
  name: z.string(),
});

export const ZodSubCategory = z.object({
  id: z.number(),
  name: z.string(),
  category: z.number(),
});
