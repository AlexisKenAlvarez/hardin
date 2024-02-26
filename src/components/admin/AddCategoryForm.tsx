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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { api } from "@/trpc/react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import CategoryItems from "./CategoryItems";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";

const AddCategoryForm = ({
  category: initialCategory,
}: {
  category: Category;
  close?: () => void;
  closeDialog?: () => void;
}) => {
  const utils = api.useUtils();

  const saveCategoryQuery = api.products.saveCategory.useMutation({
    onError: (error) => {
      categoryForm.setError("name", { message: error.message });
    },
    onSuccess: async () => {
      await utils.products.getCategories.invalidate();
      toast.success("Category saved");
      categoryForm.reset({
        name: "",
        subCategoryName: "",
        category: category[0]?.id ?? 0,
      });
    },
  });
  const [deleteMode, setDeleteMode] = useState(false);
  const [category, setCategory] = useState<Category>([...initialCategory]);
  const [removed, setRemoved] = useState<Category>([]);
  const [removedSub, setRemovedSub] = useState<Category[0]["sub_categories"]>(
    [],
  );

  const categorySchema = z.object({
    name: z.string(),
    subCategoryName: z.string(),
    category: z.number(),
  });

  type categoryFormType = z.infer<typeof categorySchema>;

  const categoryForm = useForm<categoryFormType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      subCategoryName: "",
      category: category[0]?.id ?? 0,
    },
  });

  const deleteCategory = useCallback((id: number) => {
    setCategory((current) => current.filter((item) => item.id !== id));
  }, []);

  const addToRemove = useCallback((items: Category[0]) => {
    setRemoved((current) => [...current, items]);
  }, []);

  const addToRemoveSub = useCallback(
    (items: Category[0]["sub_categories"][0]) => {
      setRemovedSub((current) => [...current, items]);
    },
    [],
  );

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
                  subCategory: {
                    name: data.subCategoryName.trim(),
                    categoryId: data.category,
                  },
                  remove: removed,
                  removeSub: removedSub,
                });
              } catch (error) {
                console.log(error);
              }
            },
          )}
          className="space-y-6"
        >
          <FormField
            control={categoryForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel  className="sm:text-base text-sm" >Add new category</FormLabel>
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

          <div
            className={cn("flex w-full items-end gap-2", {
              hidden: category.length <= 0,
            })}
          >
            <FormField
              control={categoryForm.control}
              name="subCategoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sm:text-base text-sm">Add new sub category</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Sub category name"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={categoryForm.control}
              name="category"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(val: string) => {
                        onChange(parseInt(val));
                      }}
                      defaultValue={value.toString()}
                      value={value.toString()}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          placeholder="Category"
                          defaultValue={value.toString()}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {category.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <p className="font-medium sm:text-base text-sm">Current categories:</p>
            <div className="max-h-56 space-y-2 overflow-y-scroll">
              <AnimatePresence>
                {category.map((items) => (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.4 }}
                    className="origin-left"
                    key={items.id}
                  >
                    <CategoryItems
                      items={items}
                      deleteCategory={deleteCategory}
                      addToRemove={addToRemove}
                      addToRemoveSub={addToRemoveSub}
                      pressed={deleteMode}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex gap-2">
            <Button disabled={saveCategoryQuery.isLoading}>Save</Button>
            <Toggle pressed={deleteMode} onPressedChange={setDeleteMode}>
              Delete mode
            </Toggle>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AddCategoryForm;
