import { deleteHours, deleteMenu } from "@/apis/admin";
import type { MenuItem } from "@/app/admin/(authenticated)/menu/_menu";
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
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMutation } from "@tanstack/react-query";
import { EllipsisVertical, Trash, View } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { queryClient } from "../providers/ReactQueryProvider";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import type { HoursItem } from "@/app/admin/(authenticated)/hours/_hours";
const HoursNode = ({ item, isOrderChanging }: { item: HoursItem, isOrderChanging?: boolean }) => {

  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { mutate: deleteMenuMutation } = useMutation({
    mutationFn: deleteHours,
    onError: (error) => {
      console.log(error);
      toast.dismiss("delete-menu"); // Also dismiss on error
      toast.error("Failed to delete menu", {
        id: "delete-menu",
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["hoursData"] });
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

  const ViewImageButton = ({ children }: { children: React.ReactNode }) => {
    return (
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogTrigger asChild>
          {children}
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
      </Dialog>
    )
  }

  const DeleteDialog = ({ children }: { children: React.ReactNode }) => {
    return (
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogTrigger asChild>
          {children}
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
    )
  }
  return (
    <div
      className=""
    >
      <div
        key={item.id}
        className="group relative h-96 w-72"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.image}`}
          alt={item.image}
          width={500}
          height={500}
          className="h-full w-full object-cover"
        />

        {!isOrderChanging && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"} className="absolute top-2 right-2 lg:hidden flex" size={'icon'}>
                  <EllipsisVertical className="icon" />

                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuItem className="text-red-500" onClick={() => { setDeleteDialogOpen(true) }}>Delete</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setImageDialogOpen(true) }}>View image</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="absolute left-0 top-0  h-full w-full flex-col items-center justify-center gap-2 bg-white/70 opacity-0 backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:opacity-100 lg:flex hidden">
              <DeleteDialog>
                <Button variant={"destructive"}>
                  <Trash className="icon" />
                  Delete
                </Button>
              </DeleteDialog>
              <ViewImageButton>
                <Button variant={"outline"}>
                  <View className="icon" />
                  View image
                </Button>
              </ViewImageButton>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default HoursNode;

