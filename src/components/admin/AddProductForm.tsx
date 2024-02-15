import type { Category } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { convertBytes } from "@/utils";
import { useUploadThing } from "@/utils/uploadthing";
import { useDropzone } from "@uploadthing/react";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { toast } from "sonner";

const AddProductForm = ({
  category,
}: {
  category: Category;
  close?: () => void;
}) => {
  const [previewFile, setPreviewFile] = useState<
    string | ArrayBuffer | null | undefined
  >("");

  const addProductMutation = api.products.addProduct.useMutation({
    onSuccess: () => {
      form.reset({
        name: "",
        description: "",
        image: [],
        price: 0,
        category: category[0]?.id ?? 0,
      });
    }
  });

  const { startUpload, permittedFileInfo } = useUploadThing("productUpload", {
    onUploadError: () => {
      toast.error("Error occurred while uploading");
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const newProductSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.coerce.number().min(0),
    category: z.number(),
    image: z.instanceof(File).array().min(1),
  });

  type newProductType = z.infer<typeof newProductSchema>;

  const form = useForm<newProductType>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0.0,
      category: category[0]?.id ?? 0,
      image: [],
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        setPreviewFile(event.target?.result);
      };

      if (acceptedFiles[0]) reader.readAsDataURL(acceptedFiles[0]);

      form.setValue("image", acceptedFiles);
    },
    [form],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    multiple: false,
    maxSize: 2 * 1024 * 1024,
  });

  return (
    <>
      <div className="space-y-4">
        <div className="">
          <h1 className="text-xl font-bold">Add new product</h1>
          <p className="text-sm">
            Create a new product to display on the website.
          </p>
        </div>

        {form.getValues("image").length > 0 && (
          <Image
            src={previewFile as string}
            alt="Image"
            className="mx-auto h-52 w-36 rounded-md object-cover"
            width={500}
            height={500}
          />
        )}

        <div
          {...getRootProps()}
          className={cn(
            "group mt-2 flex cursor-pointer flex-col items-center border py-3 transition-all duration-300 ease-in-out hover:bg-black/5",
            {
              "text-red-500":
                form.formState.errors.image?.message &&
                form.getValues("image").length <= 0,
            },
          )}
        >
          <input {...getInputProps()} />

          {form.getValues("image").length > 0 ? (
            <>
              <button>Choose another file</button>
              <p className="text-xs">
                &#40;File: {form.getValues("image")[0]?.name}{" "}
                {convertBytes(form.getValues("image")[0]!.size)}&#41;
              </p>
            </>
          ) : (
            <>
              <UploadCloud
                size={30}
                className="hidden opacity-50 transition-all duration-300 ease-in-out group-hover:opacity-70 sm:block"
              />
              Upload product image
              <p className="text-sm">&#40;Must not exceed 5MB.&#41;</p>
            </>
          )}
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (data: newProductType) => {
              const loadingToast = toast.loading("Uploading product...");

              try {
                const imageData = await startUpload(data.image);

                await addProductMutation.mutateAsync({
                  name: data.name,
                  description: data.description,
                  price: data.price,
                  category: data.category,
                  image: imageData![0]!.url,
                });

                toast.success("Product uploaded successfully", {
                  id: loadingToast,
                });
              } catch (error) {
                console.log(error);
                toast.error("Product uploaded successfully", {
                  id: loadingToast,
                });
              }
            })}
            className="mt-5 space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Product name"
                      autoComplete="off"
                    ></Input>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Tell us something about your product"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl className="relative">
                    <div className="relative">
                      <Input
                        type="number"
                        {...field}
                        placeholder="0.00"
                        className="pl-7"
                      />
                      <p className="absolute bottom-0 top-0 my-auto ml-3 flex items-center">
                        ₱
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>

                  <FormControl>
                    <Select
                      onValueChange={(val: string) => {
                        onChange(parseInt(val));
                      }}
                      defaultValue={value.toString()}
                      value={value.toString()}
                    >
                      <SelectTrigger className="">
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

            <Button className="w-full">Confirm</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddProductForm;
