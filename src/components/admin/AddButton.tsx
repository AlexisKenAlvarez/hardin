import { useMediaQuery } from "@/hooks/use-media-query";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent
} from "@/components/ui/drawer";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Category } from "@/lib/types";
import React from "react";
import { toast } from "sonner";
import AddCategoryForm from "./AddCategoryForm";
import AddProductForm from "./AddProductForm";

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
            className="space-y- sm:max-w-[425px] max-h-[80vh] mini-scroll overflow-y-scroll"
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
          <DrawerContent onInteractOutside={() => setOpen("")} className="max-h-screen">
            <div className="p-4 overflow-y-scroll">
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
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default AddButton;
