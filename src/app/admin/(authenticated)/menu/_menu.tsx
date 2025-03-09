"use client";

import { deleteMenu, getMenu, updateMenuOrder, uploadMenu } from "@/apis/admin";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Grab, Info, Plus, Trash, View, X } from "lucide-react";

import { queryClient } from "@/components/providers/ReactQueryProvider";
import { useSession } from "@/components/providers/SupabaseSessionProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadButton from "@/components/UploadButton";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createSwapy } from "swapy";

export interface OrderArray {
  slot: number;
  item: string
}

const MenuView = () => {
  const session = useSession();
  const [shouldInitial, setShouldInitial] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [isImageMissing, setIsImageMissing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isChangingOrder, setIsChangingOrder] = useState(false);
  const [orderArray, setOrderArray] = useState<OrderArray[]>([]);
  console.log(orderArray);

  const { data: menuData, isPending: isMenuPending } = useQuery({
    queryKey: ["menuData"],
    queryFn: () => getMenu(),
  });

  const { mutate: uploadMenuMutation, isPending: isUploading } = useMutation({
    mutationFn: uploadMenu,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["menuData"] });
      toast.success("Menu uploaded successfully");
      setUploadedImage("");
      setImageName("");
      setDialogOpen(false);
    },
  });

  const { mutate: deleteMenuMutation } = useMutation({
    mutationFn: deleteMenu,
    onError: (error) => {
      console.log(error);
      toast.dismiss("delete-menu"); // Also dismiss on error
      toast.error("Failed to delete menu", {
        id: "delete-menu",
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["menuData"] });
      toast.dismiss("delete-menu");
      toast.success("Menu deleted successfully", {
        id: "delete-menu",
      });
    },
    onMutate: async () => {
      toast.loading("Deleting menu...", {
        id: "delete-menu",
      });
    },
  });

  const { mutate: updateMenuOrderMutation, isPending: isUpdatingOrder } = useMutation({
    mutationFn: updateMenuOrder,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async () => {
      setIsChangingOrder(false);
      toast.success("Menu order updated successfully");
    },
  });

  useEffect(() => {
    if (menuData && menuData?.length > 0) {
      const container = document.querySelector(".container");
      const swapy = createSwapy(container as HTMLElement, {
        autoScrollOnDrag: true,
        enabled: isChangingOrder,
      });
      swapy.onSwapEnd((items) => {
        setOrderArray(items.slotItemMap.asArray as unknown as OrderArray[])
      });
    }
  }, [menuData, isChangingOrder]);

  return (
    <div className="flex flex-1 flex-col items-start gap-4 font-sans">
      <div className="flex w-full gap-2">
        <AnimatePresence mode="wait">
          {isChangingOrder ? (
            <motion.div
              className="flex w-full items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              key={"changing-order"}
            >
              <p className="sub-header">Drag to change the order of the menu</p>
              <Button
                disabled={isUpdatingOrder}
                onClick={() => {
                  updateMenuOrderMutation(orderArray);
                  if (!shouldInitial) {
                    setShouldInitial(true);
                  }
                }}
              >
                {isUpdatingOrder ? "Saving..." : "Save changes"}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={shouldInitial ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              key={"menu-view"}
              className="flex w-full gap-2"
            >
              <Dialog
                open={dialogOpen}
                onOpenChange={(e) => {
                  if (!e) {
                    setUploadedImage("");
                    setImageName("");
                  }
                  setDialogOpen(e);
                }}
              >
                <Button
                  className="flex items-center gap-2"
                  onClick={() => setDialogOpen(true)}
                >
                  <Plus />
                  Add Image
                </Button>
                <DialogContent>
                  <button
                    className="absolute right-4 top-4"
                    onClick={() => setDialogOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <DialogHeader>
                    <DialogTitle>Add new menu</DialogTitle>
                    <DialogDescription>
                      Upload an image of the menu.
                    </DialogDescription>
                  </DialogHeader>

                  <UploadButton
                    isImageMissing={isImageMissing}
                    label="Upload image"
                    onImageUpload={({ image, name }) => {
                      setUploadedImage(image);
                      setImageName(name);
                      setIsImageMissing(false);
                    }}
                  />

                  {uploadedImage && (
                    <Image
                      src={uploadedImage ?? ""}
                      alt={imageName}
                      width={500}
                      height={500}
                    />
                  )}
                  <Button
                    className="w-full"
                    disabled={isUploading}
                    onClick={() => {
                      if (uploadedImage === "" || imageName === "") {
                        setIsImageMissing(true);
                        return;
                      }
                      uploadMenuMutation({
                        image: uploadedImage,
                        name: imageName,
                        uploaded_by: session?.user?.email ?? "",
                      });
                    }}
                  >
                    {isUploading ? "Uploading..." : "Add to Menu"}
                  </Button>
                </DialogContent>
              </Dialog>

              <Button
                className="flex items-center gap-2"
                variant={"outline"}
                onClick={() => setIsChangingOrder(true)}
              >
                Change Order
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full flex-1 flex-col border p-4">
        {isMenuPending ? (
          <div className="flex gap-2">
            <Skeleton className="h-96 w-72" />
            <Skeleton className="h-96 w-72" />
            <Skeleton className="h-96 w-72" />
          </div>
        ) : (
          <div className="h-full flex-1">
            {menuData?.length === 0 ? (
              <div className="grid h-full flex-1 place-content-center">
                <h1 className="text-center text-black-secondary">No result.</h1>
              </div>
            ) : (
              <div
                className={cn("container flex select-none flex-wrap gap-4", {
                  "cursor-grab": isChangingOrder,
                })}
              >
                {menuData?.map((item) => (
                  <div
                    className=""
                    key={item.image}
                    data-swapy-slot={item.order}
                  >
                    <div
                      key={item.id}
                      className="group relative h-96 w-72"
                      data-swapy-item={item.image}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.image}`}
                        alt={item.image}
                        width={500}
                        height={500}
                        className="h-full w-full object-cover"
                      />

                      <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 bg-white/70 opacity-0 backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:opacity-100">
                        {isChangingOrder ? (
                          <div className="flex items-center gap-2 flex-col">
                            <Grab />
                            <p>Drag to change the order</p>
                          </div>
                        ) : (

                          <><Dialog>
                            <DialogTrigger asChild>
                              <Button variant={"destructive"}>
                                <Trash className="icon" />
                                Delete
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Are you absolutely sure?
                                </DialogTitle>
                                <DialogDescription>
                                  This will permanently delete the image from the
                                  menu.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button
                                    variant={"destructive"}
                                    onClick={() => {
                                      deleteMenuMutation({
                                        id: item.id,
                                        image: item.image,
                                      });
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                            <Button variant={"outline"}>
                              <Info className="icon" />
                              View info
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant={"outline"}>
                                  <View className="icon" />
                                  View image
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogTitle className="hidden">
                                  {item.image}
                                </DialogTitle>
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.image}`}
                                  alt={item.image}
                                  width={500}
                                  height={500}
                                />
                              </DialogContent>
                            </Dialog></>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuView;
