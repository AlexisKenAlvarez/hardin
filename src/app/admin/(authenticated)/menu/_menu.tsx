"use client";

import { getMenu, updateMenuOrder, uploadMenu } from "@/apis/admin";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";

import MenuNode from "@/components/admin/MenuNode";
import { queryClient } from "@/components/providers/ReactQueryProvider";
import { useSession } from "@/components/providers/SupabaseSessionProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UploadButton from "@/components/UploadButton";
import type { Database } from "@/lib/database.types";
import { cn } from "@/lib/utils";
import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arraySwap,
  rectSwappingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface OrderArray {
  slot: number;
  item: string;
}

export type MenuItem = Database["public"]["Tables"]["menu"]["Row"];

const MenuView = () => {
  const session = useSession();
  const [shouldInitial, setShouldInitial] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [isImageMissing, setIsImageMissing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isChangingOrder, setIsChangingOrder] = useState(false);
  const [menuArray, setMenuArray] = useState<MenuItem[] | null | undefined>([]);
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  console.log("MENU ARRAY", menuArray);

  const {
    data: menuData,
    isPending: isMenuPending,
    isFetched: isMenuFetched,
  } = useQuery({
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

  const { mutate: updateMenuOrderMutation, isPending: isUpdatingOrder } =
    useMutation({
      mutationFn: updateMenuOrder,
      onError: (error) => {
        console.log(error);
      },
      onSuccess: async () => {
        setIsChangingOrder(false);
        toast.success("Menu order updated successfully");
      },
    });

  const getItemIndex = (id: number) =>
    menuArray?.findIndex((item) => item.id === id);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = getItemIndex(Number(active.id));
      const newIndex = getItemIndex(Number(over?.id));

      console.log("OLD INDEX", oldIndex);
      console.log("NEW INDEX", newIndex);

      setMenuArray((items) => {
        return arraySwap(items ?? [], oldIndex ?? 0, newIndex ?? 0);
      });
    }
  }

  useEffect(() => {
    if (isMenuFetched) {
      setMenuArray(menuData);
    }
  }, [isMenuFetched, menuData]);

  return (
    <div className="flex flex-1 flex-col items-start gap-4 font-secondary">
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
              <p className="sub-header text-xs sm:text-base">
                Drag to change the order of the menu
              </p>
              <div className="flex gap-2">
                <Button
                  variant={"outline"}
                  disabled={isUpdatingOrder}
                  onClick={() => {
                    setMenuArray(menuData);
                    setIsChangingOrder(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isUpdatingOrder}
                  onClick={() => {
                    setIsChangingOrder(false);
                    if (!shouldInitial) {
                      setShouldInitial(true);
                    }
                    updateMenuOrderMutation(menuArray ?? []);
                  }}
                >
                  {isUpdatingOrder ? "Saving..." : "Save changes"}
                </Button>
              </div>
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
              <div className={cn("flex select-none flex-wrap gap-4")}>
                <DndContext
                  onDragEnd={handleDragEnd}
                  collisionDetection={closestCorners}
                  sensors={sensors}
                >
                  <SortableContext
                    items={menuArray ?? []}
                    strategy={rectSwappingStrategy}
                    disabled={!isChangingOrder}
                  >
                    {menuArray?.map((item) => (
                      <MenuNode
                        key={item?.id}
                        isOrderChanging={isChangingOrder}
                        item={item}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuView;
