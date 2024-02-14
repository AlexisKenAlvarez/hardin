import { useMediaQuery } from "@/hooks/use-media-query";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import type { Category } from "@/lib/types";
import React from "react";
import AddCategoryForm from "./AddCategoryForm";
import AddProductForm from "./AddProductForm";
import { toast } from "sonner";

const AddButton = ({ category }: { category: Category }) => {
  const [open, setOpen] = useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const addDropdown = [
    {
      label: "New product",
      value: "new_product",
      component: AddProductForm,
    },

    {
      label: "Edit category",
      value: "new_category",
      component: AddCategoryForm,
    },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full bg-brown p-2 text-white transition-all duration-300 ease-in-out hover:scale-[1.1]">
            <Plus />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="">
          {addDropdown.map((item) => (
            <DropdownMenuItem
              className="!hover:text-brown"
              key={item.value}
              onClick={() => {
                if (category.length <= 0 && item.value === "new_product") {
                  toast.error("You need to add a category first");
                } else {

                  setOpen(item.value);
                }
              }}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {isDesktop ? (
        <Dialog
          open={open !== ""}
          onOpenChange={(value) =>
            !value ? setOpen("") : setOpen((val) => val)
          }
        >
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent
            className="space-y- sm:max-w-[425px]"
            onInteractOutside={() => setOpen("")}
          >
            {addDropdown.map((item) => (
              <React.Fragment key={item.value}>
                {open === item.value && (
                  <item.component
                    category={category}
                    close={() => setOpen("")}
                  />
                )}
              </React.Fragment>
            ))}
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          open={open !== ""}
          onOpenChange={(value) =>
            !value ? setOpen("") : setOpen((val) => val)
          }
        >
          <DrawerContent onInteractOutside={() => setOpen("")}>
            <div className="p-4">
              {addDropdown.map((item) => (
                <React.Fragment key={item.value}>
                  {open === item.value && (
                    <item.component
                      category={category}
                      close={() => setOpen("")}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default AddButton;
