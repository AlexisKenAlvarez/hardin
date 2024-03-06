/* eslint-disable @next/next/no-img-element */
import type { Category } from "@/lib/types";
import { useUploadThing } from "@/utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "@uploadthing/react";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { z } from "zod";

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
import { cn, setCanvasPreview } from "@/lib/utils";
import type { RouterOutputs } from "@/server/api";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";

import type { Crop } from "react-image-crop";

const EditProductForm = ({
  category,
  cancelEditing,
  editing,
}: {
  category: Category;
  cancelEditing: () => void;
  editing: RouterOutputs["products"]["getProducts"][0];
}) => {
  const [imageChanged, setImageChanged] = useState(false);
  const [crop, setCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [previewFile, setPreviewFile] = useState<
    string | ArrayBuffer | null | undefined
  >(editing.image);

  const utils = api.useUtils();
  const addProductMutation = api.products.editProduct.useMutation({
    onSuccess: () => {
      cancelEditing();
    },
  });

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    "productUpload",
    {
      onUploadError: () => {
        toast.error("Error occurred while uploading");
      },
    },
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const newProductSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.coerce.number().min(0),
    category: z.number(),
    sub_category: z.number().nullish(),
    image: z.instanceof(File).array(),
  });

  type newProductType = z.infer<typeof newProductSchema>;

  const form = useForm<newProductType>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      name: editing.name,
      description: editing.description,
      price: editing.price,
      category: editing.category,
      sub_category: editing.sub_category ?? null,
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
      setImageChanged(true);
    },
    [form],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    multiple: false,
    maxSize: 2 * 1024 * 1024,
  });

  const onImageLoad: React.EventHandler<
    React.SyntheticEvent<HTMLImageElement>
  > = (event) => {
    const image = event.currentTarget;
    const { width, height } = image;
    const cropWidthInPercent = (150 / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      1,
      width,
      height,
    );

    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="">
          <h1 className="text-xl font-bold">Edit product</h1>
          <p className="text-sm">
            Edit the details of the product and click confirm to save changes
          </p>
        </div>

        {form.getValues("image").length > 0 && (
          <ReactCrop
            className=""
            crop={crop}
            onChange={(c) => setCrop(c)}
            circularCrop
            aspect={1}
            // minWidth={150}
            // locked
            keepSelection
            ruleOfThirds
            onComplete={async (c) => {
              setCanvasPreview(
                imgRef.current!,
                canvasRef.current!,
                convertToPixelCrop(
                  c,
                  imgRef.current!.width,
                  imgRef.current!.height,
                ),
              );
            }}
          >
            <img
              ref={imgRef}
              src={previewFile as string}
              width={1000}
              height={1000}
              alt="crop_image"
              onLoad={onImageLoad}
            />
          </ReactCrop>
        )}
        <canvas
          ref={canvasRef}
          className="mx-auto mt-4  hidden rounded-full border"
          style={{ width: 150, height: 150, objectFit: "contain" }}
        />

        {!imageChanged && (
          <Image
            src={previewFile as string}
            alt="Image"
            className="mx-auto w-44 rounded-full object-cover"
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
                imageChanged &&
                form.formState.errors.image?.message &&
                form.getValues("image").length <= 0,
            },
          )}
        >
          <input {...getInputProps()} />

          {form.getValues("image").length > 0 || previewFile !== "" ? (
            <>
              <button>Choose another file</button>
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
              try {
                const hasCategory = category.some(
                  (val) =>
                    val.id === data.category && val.sub_categories.length > 0,
                );

                if (hasCategory && data.sub_category === null) {
                  form.setError("sub_category", {
                    message: "Please select a category",
                  });
                }
                const loadingToast = toast.loading("Updating product...");

                console.log("Going in");

                if (imageChanged) {
                  const response = await fetch(canvasRef.current!.toDataURL());
                  const blob = await response.blob();
                  const file = new File([blob], data.image[0]!.name, {
                    type: data.image[0]!.type,
                    lastModified: Date.now(),
                  });

                  const reader = new FileReader();
                  reader.readAsDataURL(file);

                  const imageData = await startUpload([file]);

                  await addProductMutation.mutateAsync({
                    imageChanged,
                    newData: {
                      id: editing.id,
                      name: data.name,
                      description: data.description,
                      price: data.price,
                      category: data.category,
                      image: imageData![0]!.url,
                      sub_category: !hasCategory ? null : data.sub_category,
                    },
                    origData: editing,
                  });
                } else {
                  console.log("Image not changed");

                  await addProductMutation.mutateAsync({
                    imageChanged,
                    newData: {
                      id: editing.id,
                      name: data.name,
                      description: data.description,
                      price: data.price,
                      category: data.category,
                      image: editing.image,
                      sub_category: !hasCategory ? null : data.sub_category,
                    },
                    origData: editing,
                  });
                }

                toast.success("Product updated successfully", {
                  id: loadingToast,
                });

                await utils.products.getProducts.invalidate();
              } catch (error) {
                console.log(error);
                toast.error("Product update failed");
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

            <div className="flex w-full justify-between gap-3">
              <FormField
                control={form.control}
                name="category"
                render={({ field: { onChange, value } }) => (
                  <FormItem className="w-full">
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
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}
                            >
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

              <FormField
                control={form.control}
                name="sub_category"
                render={({ field: { onChange, value } }) => (
                  <>
                    {category.map(
                      (item) =>
                        item.id === form.getValues("category") &&
                        item.sub_categories.length > 0 && (
                          <FormItem className="w-full" key={item.id}>
                            <FormLabel>Sub Category</FormLabel>

                            <FormControl>
                              <Select
                                onValueChange={(val: string) => {
                                  onChange(parseInt(val));
                                }}
                                defaultValue={value?.toString()}
                                value={value?.toString()}
                              >
                                <SelectTrigger className="">
                                  <SelectValue
                                    placeholder="Category"
                                    defaultValue={item.sub_categories[0]?.name}
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  {item.sub_categories.map((sub) => (
                                    <SelectItem
                                      key={sub.id}
                                      value={sub.id.toString()}
                                    >
                                      {sub.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        ),
                    )}
                  </>
                )}
              />
            </div>

            <Button
              className="w-full"
              disabled={addProductMutation.isLoading || isUploading}
            >
              Confirm
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditProductForm;
