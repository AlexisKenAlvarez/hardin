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
      .select(`id, name, sub_categories ( id, name, category )`);

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
        subCategory: z.object({
          name: z.string(),
          categoryId: z.number(),
        }),
        remove: z.array(ZodCategory).nullish(),
        removeSub: z.array(ZodCategory).nullish(),
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

      if (input.subCategory?.name !== "") {
        const { error: addSubError } = await ctx.supabase
          .from("sub_categories")
          .insert({
            name: input.subCategory.name,
            category: input.subCategory.categoryId,
          });

        if (addSubError) {
          throw new TRPCError({
            message: addSubError.message,
            code: "INTERNAL_SERVER_ERROR",
          });
        }
      }

      if (input.remove && input.remove.length > 0) {
        input.remove.forEach(async (category) => {
          const { error: removeError } = await ctx.supabase
            .from("categories")
            .delete()
            .eq("id", category.id);

          if (removeError) {
            throw new TRPCError({
              message: removeError.message,
              code: "INTERNAL_SERVER_ERROR",
            });
          }
        });
      }

      if (input.removeSub && input.removeSub.length > 0) {
        input.removeSub.forEach(async (subCategory) => {
          const { error: removeSubError } = await ctx.supabase
            .from("sub_categories")
            .delete()
            .eq("id", subCategory.id);

          if (removeSubError) {
            throw new TRPCError({
              message: removeSubError.message,
              code: "INTERNAL_SERVER_ERROR",
            });
          }
        });
      }

      return true;
    }),
  addProduct: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        price: z.coerce.number().min(0),
        category: z.number(),
        sub_category: z.number().nullish(),
        image: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("SubCateg: " + input.sub_category);

      const { error: newProductError } = await ctx.supabase
        .from("products")
        .insert(input);

      if (newProductError)
        throw new TRPCError({
          message: newProductError.message,
          code: "INTERNAL_SERVER_ERROR",
        });

      return true;
    }),
  getProducts: publicProcedure
    .input(
      z.object({
        category: z.number(),
        sub_category: z.number().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {

      console.log("Inputted category " ,input.category);
      if (!input.sub_category) {
        const { data: productData, error: productError } = await ctx.supabase
          .from("products")
          .select()
          .eq("category", input.category);

        if (productError)
          throw new TRPCError({
            message: productError.message,
            code: "INTERNAL_SERVER_ERROR",
          });

        return productData;
      } else {
        const { data: productData, error: productError } = await ctx.supabase
          .from("products")
          .select()
          .eq("category", input.category)
          .eq("sub_category", input.sub_category);

        if (productError)
          throw new TRPCError({
            message: productError.message,
            code: "INTERNAL_SERVER_ERROR",
          });

        return productData;
      }
    }),
});
