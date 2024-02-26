"use client";
import type { RouterOutputs } from "@/server/api";
import { supabase } from "@/supabase/supabaseClient";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import AddButton from "./AddButton";
import {
  ChevronRight,
  Filter,
  LayoutGrid,
  List,
  LogOut,
  Menu,
} from "lucide-react";
import { ChevronsUpDown, MoreVertical } from "lucide-react";

import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ChevronLeft } from "lucide-react";
import EditProductForm from "./EditProductForm";
import { toast } from "sonner";

import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";

const AdminDashboard = ({
  session,
  categories,
  products,
  queryCategory,
  querySub,
  offset,
  totalPage,
  page,
  limit,
}: {
  session: RouterOutputs["auth"]["getSession"];
  categories: Category;
  products: RouterOutputs["products"]["getProducts"];
  queryCategory: number;
  querySub: number | null;
  totalPage: number;
  offset: number;
  limit: number;
  page: number;
}) => {
  const utils = api.useUtils();
  const searchParams = useSearchParams();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [editing, setEditing] = useState<
    RouterOutputs["products"]["getProducts"][0] | null
  >(null);

  const router = useRouter();
  const pathname = usePathname();

  const deleteMutation = api.products.deleteProduct.useMutation();

  const { data: categoryData } = api.products.getCategories.useQuery(
    undefined,
    { initialData: categories },
  );

  const { data: productsData } = api.products.getProducts.useQuery(
    {
      category: queryCategory,
      sub_category: querySub,
      offset,
      limit,
    },
    {
      initialData: products,
    },
  );

  function handleCategory(
    value: string,
    type: "category" | "sub",
    callback?: void,
  ) {
    const params = new URLSearchParams(searchParams);

    if (type == "category") {
      params.delete("sub");
      params.set("category", value);
    } else {
      params.set("sub", value);
    }

    router.push(`${pathname}?${params.toString()}`);

    callback;
  }

  const handlePage = (type: "prev" | "next") => {
    const params = new URLSearchParams(searchParams);

    if (type === "prev") {
      const newPage = page ? page - 1 : 1;
      params.set("page", newPage.toString());
    } else {
      const newPage = page + 1;
      params.set("page", newPage.toString());
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const brown = "#76422C";
  const [productView, setProductView] = useState("grid");

  const cancelEditing = useCallback(() => {
    setEditing(null);
  }, []);

  if (!session?.data.session) return null;

  const sideBar = (
    <>
      <h1 className="mb-5 font-primary text-xl font-medium">Categories:</h1>

      {categoryData.map((category) => (
        <div className="" key={category.id}>
          <Button
            variant="ghost"
            className="group relative w-full justify-between text-lg"
            onClick={() => {
              handleCategory(category.name, "category");
            }}
          >
            <h1
              className={cn("", {
                "d  text-brown": searchParams.get("category") === category.name,
                " text-brown":
                  searchParams.get("category") === null &&
                  category.name === "drinks",
              })}
            >
              {category.name}
            </h1>
            {category.sub_categories.length > 0 && <ChevronsUpDown size={16} />}
          </Button>

          {category.name === searchParams.get("category") &&
            category.sub_categories.length > 0 &&
            category.sub_categories.map((sub) => (
              <div className="ml-4 flex items-center border-l-2" key={sub.id}>
                <div className="inline-block h-[2px] w-3 bg-black/10"></div>
                <div
                  className={cn(
                    "flex w-full cursor-pointer justify-start py-1 pl-2 hover:bg-slate-100",
                    {
                      "font-medium text-brown":
                        searchParams.get("sub") === sub.name,
                    },
                  )}
                  onClick={() => {
                    if (searchParams.get("category") !== category.name) {
                      handleCategory(
                        category.name,
                        "category",
                        handleCategory(sub.name, "sub"),
                      );
                    } else {
                      handleCategory(sub.name, "sub");
                    }
                  }}
                >
                  {sub.name}
                </div>
              </div>
            ))}
        </div>
      ))}
    </>
  );

  return (
    <section className="flex min-h-screen w-full bg-bg lg:p-2">
      <div className="flex w-full flex-1 flex-col bg-white">
        <nav className="flex w-full items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Image
              alt="image"
              src="/logo.webp"
              width={900}
              height={900}
              className="w-11"
            />
            <h1 className="font-primary text-3xl text-brown">HARDIN CAFE</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent alignOffset={3} align="end">
              <DropdownMenuLabel>Account settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.refresh();
                }}
                className="cursor-pointer gap-x-2 hover:bg-slate-50 hover:text-red-500"
              >
                <LogOut size={14} /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <Separator />
        <div className="flex h-full w-full">
          <div
            className={cn(
              "relative left-0 top-0 z-10 hidden h-screen w-56 bg-white p-4 lg:block",
            )}
          >
            {sideBar}
          </div>
          <Sheet open={categoryOpen} onOpenChange={setCategoryOpen}>
            <SheetContent className="lg:hidden" side="left">
              {sideBar}
            </SheetContent>
          </Sheet>
          <Separator orientation="vertical" className="h-full" />
          <div className="w-full">
            <div className="flex w-full justify-between px-4  py-3 lg:justify-end ">
              <Button
                variant="secondary"
                className="flex gap-2 lg:hidden"
                onClick={() => setCategoryOpen(true)}
              >
                <Filter strokeWidth="1.2" size={14} />
                <p className="">Filter</p>
              </Button>
              <div className="flex w-full items-center justify-end gap-3">
                <button>
                  <List
                    stroke={productView === "list" ? brown : "black"}
                    onClick={() => setProductView("list")}
                  />
                </button>
                <button>
                  <LayoutGrid
                    fill={productView === "grid" ? brown : "black"}
                    stroke={productView === "grid" ? brown : "black"}
                    onClick={() => setProductView("grid")}
                  />
                </button>
                <AddButton category={categoryData} />
              </div>
            </div>
            <Separator />
            {productsData.length === 0 && (
                <h1 className="text-center mt-10">There are no products yet.</h1>
              )}
            <div className="grid-cols-1dddddddddddddddd mx-auto grid w-full gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">

              {productsData.map((product) => (
                <div className="relative flex  bg-neutral-100" key={product.id}>
                  <AlertDialog open={isDeleting === product.id} onOpenChange={(val) => !val ?? setIsDeleting(0)} >
                    <AlertDialogTrigger></AlertDialogTrigger>
                    <AlertDialogContent >
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the product.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsDeleting(0)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            try {
                              await deleteMutation.mutateAsync({
                                id: product.id,
                                image: product.image,
                              });

                              toast.success("Product deleted successfully");
                              await utils.products.getProducts.invalidate();
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                          disabled={deleteMutation.isLoading}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      className="absolute right-0 top-2 cursor-pointer opacity-50 hover:opacity-100"
                    >
                      <MoreVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setEditing(product)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setIsDeleting(product.id)} >Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Image
                    className="h-36 w-20 shrink-0 object-cover md:h-44 md:w-28 xl:h-52 xl:w-36"
                    alt={product.name}
                    src={product.image}
                    width={700}
                    height={700}
                  />
                  <div className="w-60 p-5">
                    <h1 className="font-secondary text-base font-extrabold text-brown xl:text-xl">
                      {product.name}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {product.description}
                    </p>

                    <div className="mt-5">
                      <p className="text-sm font-semibold capitalize text-muted-foreground">
                        {product.sub_categories?.name}
                      </p>
                      <p className="text-base font-bold text-lime-500 md:text-lg">
                        P{product.price}.00
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-5 flex w-fit items-center gap-4">
              <Button
                onClick={() => handlePage("prev")}
                disabled={!page || page === 1}
              >
                <ChevronLeft size={17} />
              </Button>
              {page ?? 1} of {totalPage}
              <Button
                onClick={() => handlePage("next")}
                disabled={page >= totalPage}
              >
                <ChevronRight size={17} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isDesktop ? (
        <Dialog
          open={editing !== null}
          onOpenChange={(val) => !val ?? setEditing(null)}
        >
          <DialogContent
            className="space-y- mini-scroll max-h-[80vh] overflow-y-scroll sm:max-w-[425px]"
            onInteractOutside={cancelEditing}
          >
            {editing && (
              <EditProductForm
                category={categories}
                cancelEditing={cancelEditing}
                editing={editing}
              />
            )}
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          open={editing !== null}
          onOpenChange={(val) => !val ?? setEditing(null)}
        >
          <DrawerContent
            onInteractOutside={cancelEditing}
            className="max-h-screen"
          >
            <div className="overflow-y-scroll p-4">
              {editing && (
                <EditProductForm
                  category={categories}
                  cancelEditing={cancelEditing}
                  editing={editing}
                />
              )}
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </section>
  );
};

export default AdminDashboard;
