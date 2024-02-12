import type { Category } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const AddCategoryForm = ({
  category: initialCategory,
}: {
  category: Category;
  close?: () => void;
}) => {
  const utils = api.useUtils();

  const saveCategoryQuery = api.products.saveCategory.useMutation({
    onError: (error) => {
      categoryForm.setError("name", { message: error.message });
    },
    onSuccess: async () => {
      await utils.products.getCategories.invalidate();

      categoryForm.reset();
    },
  });

  const [category, setCategory] = useState<Category>([...initialCategory]);
  const [removed, setRemoved] = useState<Category>([]);

  const categorySchema = z.object({
    name: z.string(),
  });

  type categoryFormType = z.infer<typeof categorySchema>;

  const categoryForm = useForm<categoryFormType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    setCategory([...initialCategory]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategory]);

  return (
    <>
      <div className="">
        <h1 className="text-xl font-bold">Edit Categories</h1>
        <p className="text-sm">
          Removing a category will also remove all products under that category.
        </p>
      </div>

      <Form {...categoryForm}>
        <form
          onSubmit={categoryForm.handleSubmit(
            async (data: categoryFormType) => {
              try {
                await saveCategoryQuery.mutateAsync({
                  name: data.name.trim(),
                  remove: removed,
                });
              } catch (error) {
                console.log(error);
              }
            },
          )}
          className="space-y-4"
        >
          <FormField
            control={categoryForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add new category</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Category name"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <AnimatePresence>
              {category.map((items) => (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-2 origin-left"
                  key={items.id}
                >
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      setCategory((current) =>
                        current.filter((item) => item.id !== items.id),
                      );
                      setRemoved((current) => [...current, items]);
                    }}
                    className="grid h-5 w-5 shrink-0 place-content-center rounded-full bg-red-500 p-2 font-bold text-white hover:bg-red-400"
                  >
                    -
                  </button>
                  <h1 className="">{items.name}</h1>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Button>Save</Button>
        </form>
      </Form>
    </>
  );
};

export default AddCategoryForm;
