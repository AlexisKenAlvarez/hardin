/* eslint-disable @typescript-eslint/no-misused-promises */

import { ZodCategory } from "@/lib/types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

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
  saveCategory: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        remove: z.array(ZodCategory).nullish()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.name !== "") {
        const { error: addError } = await ctx.supabase
          .from("categories")
          .insert({ name: input.name });

        if (addError) {
          throw new TRPCError({
            message: addError.message,
            code: "INTERNAL_SERVER_ERROR",
          });
        }
      }
      console.log("🚀 ~ .mutation ~ input.remove:", input.remove)
      
      if (input.remove && input.remove.length > 0) {
        input.remove.forEach(async (category) => {
          const { error: removeError } = await ctx.supabase.from("categories").delete().eq("id", category.id);

          if (removeError) {
            throw new TRPCError({
              message: removeError.message,
              code: "INTERNAL_SERVER_ERROR",
            });
          }
        })
      }

      return true
    }),
});
