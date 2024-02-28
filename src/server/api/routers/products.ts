/* eslint-disable @typescript-eslint/no-misused-promises */

import { ZodCategory } from "@/lib/types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { utapi } from "@/server/uploadthing";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const productObject = z.object({
  id: z.number(),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().min(0),
  category: z.number(),
  sub_category: z.number().nullish(),
  image: z.string(),
});

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
  getSubCategories: publicProcedure.query(async ({ ctx }) => {
    const { data: subCategoriesData, error: subCategoriesError } =
      await ctx.supabase.from("sub_categories").select();

    if (subCategoriesError) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error fetching categories",
      });
    }

    return subCategoriesData;
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
      console.log("Inputted category ", input.sub_category);
      if (!input.sub_category) {
        const { data: productData, error: productError } = await ctx.supabase
          .from("products")
          .select(`*, sub_categories ( id, name )`)
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
          .select(`*, sub_categories ( id, name )`)
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
  editProduct: protectedProcedure
    .input(
      z.object({
        origData: productObject,
        newData: productObject,
        imageChanged: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        name: newName,
        category: newCategory,
        description: newDescription,
        image: newImage,
        price: newPrice,
        sub_category: newSubCategory,
      } = input.newData;
      const {
        id: origId,
        name: origName,
        category: origCategory,
        image: origImage,
        description: origDescription,
        price: origPrice,
        sub_category: origSubCategory,
      } = input.origData;

      if (newName !== origName) {
        const { error: updateNameError } = await ctx.supabase
          .from("products")
          .update({ name: newName })
          .eq("id", origId);

        if (updateNameError)
          throw new TRPCError({
            message: updateNameError.message,
            code: "INTERNAL_SERVER_ERROR",
          });
      }

      if (newCategory !== origCategory) {
        const { error: updateCategoryError } = await ctx.supabase
          .from("products")
          .update({ category: newCategory })
          .eq("id", origId);

        if (updateCategoryError)
          throw new TRPCError({
            message: updateCategoryError.message,
            code: "INTERNAL_SERVER_ERROR",
          });
      }

      if (newDescription !== origDescription) {
        const { error: updateDescriptionError } = await ctx.supabase
          .from("products")
          .update({ description: newDescription })
          .eq("id", origId);

        if (updateDescriptionError)
          throw new TRPCError({
            message: updateDescriptionError.message,
            code: "INTERNAL_SERVER_ERROR",
          });
      }

      if (input.imageChanged) {
        const { error: updateImageError } = await ctx.supabase
          .from("products")
          .update({ image: newImage })
          .eq("id", origId);

        const newUrl = new URL(origImage);

        if (
          newUrl.hostname === "utfs.io" ||
          newUrl.hostname === "uploadthing.com"
        ) {
          const filekey = origImage.substring(origImage.lastIndexOf("/") + 1);
          await utapi.deleteFiles(filekey);
        }

        if (updateImageError)
          throw new TRPCError({
            message: updateImageError.message,
            code: "INTERNAL_SERVER_ERROR",
          });
      }

      if (newPrice !== origPrice) {
        const { error: updatePriceError } = await ctx.supabase
          .from("products")
          .update({ price: newPrice })
          .eq("id", origId);

        if (updatePriceError)
          throw new TRPCError({
            message: updatePriceError.message,
            code: "INTERNAL_SERVER_ERROR",
          });
      }

      if (newSubCategory !== origSubCategory) {
        const { error: updateSubCategoryError } = await ctx.supabase
          .from("products")
          .update({ sub_category: newSubCategory })
          .eq("id", origId);

        if (updateSubCategoryError)
          throw new TRPCError({
            message: updateSubCategoryError.message,
            code: "INTERNAL_SERVER_ERROR",
          });
      }

      return true;
    }),
  countProducts: publicProcedure.query(async ({ ctx }) => {
    const { count } = await ctx.supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    return count ?? 0;
  }),
  deleteProduct: protectedProcedure
    .input(
      z.object({
        toDeleteArray: z.array(
          z.object({
            id: z.number(),
            image: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      input.toDeleteArray.forEach(async (product) => {
        const { error: deleteError } = await ctx.supabase
          .from("products")
          .delete()
          .eq("id", product.id);

        if (deleteError) {
          throw new TRPCError({
            message: deleteError.message,
            code: "INTERNAL_SERVER_ERROR",
          });
        }

        const newUrl = new URL(product.image);

        if (
          newUrl.hostname === "utfs.io" ||
          newUrl.hostname === "uploadthing.com"
        ) {
          const filekey = product.image.substring(
            product.image.lastIndexOf("/") + 1,
          );
          await utapi.deleteFiles(filekey);
        }
      });

      return true;
    }),
});
