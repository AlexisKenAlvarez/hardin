import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const productsRouter = createTRPCRouter({
  getCategories: publicProcedure.query(async ({ ctx }) => {
    const { data: categoriesData, error: categoriesError } = await ctx.supabase
      .from("categories")
      .select();

    if (categoriesError) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error fetching categories",
      });
    }

    return categoriesData;
  }),
});
