import type { RouterOutputs } from "@/server/api";
import { z } from "zod";

export type Category = RouterOutputs["products"]["getCategories"];

export const ZodCategory = z.object({
  id: z.number(),
  name: z.string(),
});