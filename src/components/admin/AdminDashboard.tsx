"use client";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import type { RouterOutputs } from "@/server/api";
import { supabase } from "@/supabase/supabaseClient";
import { api } from "@/trpc/react";
import {
  ChevronsUpDown,
  Filter,
  LogOut,
  Menu,
  Pencil,
  Trash,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import AddButton from "./AddButton";

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
import { toast } from "sonner";
import EditProductForm from "./EditProductForm";

import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";

const AdminDashboard = ({
  session,
  categories,
  subCategories,
  products,
  queryCategory,
  querySub,
}: {
  session: RouterOutputs["auth"]["getSession"];
  categories: Category;
  products: RouterOutputs["products"]["getProducts"];
  subCategories: RouterOutputs["products"]["getSubCategories"];
  queryCategory: number;
  querySub: number | null;
}) => {
  type toDeleteType = {
    id: number;
    image: string;
  };

  const utils = api.useUtils();
  const searchParams = useSearchParams();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [toDelete, setToDelete] = useState<toDeleteType[]>([]);

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
    setToDelete([]);

    if (type == "category") {
      params.delete("sub");
      params.set("category", value);
    } else {
      params.set("sub", value);
    }

    router.push(`${pathname}?${params.toString()}`);

    callback;
  }

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
              "relative left-0 top-0 z-10 hidden w-56 bg-white p-4 lg:block",
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
              <div className="flex w-full items-center justify-between gap-3">
                <div className="flex gap-4">
                  <div
                    className={cn("flex items-center gap-2 ", {
                      hidden: productsData.length === 0,
                    })}
                  >
                    <Checkbox
                      id="selectall"
                      checked={toDelete.length === productsData.length}
                      onCheckedChange={(val) => {
                        if (val) {
                          setToDelete([]);
                          setToDelete((val) => [
                            ...val,
                            ...productsData.map((product) => {
                              return { id: product.id, image: product.image };
                            }),
                          ]);
                        } else {
                          setToDelete([]);
                        }
                      }}
                    />
                    <label htmlFor="selectall">Select all</label>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className={cn("flex gap-2", {
                          hidden: toDelete.length === 0,
                        })}
                      >
                        <Trash size={14} />
                        <p>
                          Delete {toDelete.length} item
                          {toDelete.length > 1 && <span>s</span>}{" "}
                        </p>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the products selected.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          disabled={deleteMutation.isLoading}
                          onClick={async () => {
                            try {
                              const loading = toast.loading(
                                "Deleting products...",
                              );
                              await deleteMutation.mutateAsync({
                                toDeleteArray: toDelete,
                              });
                              await utils.products.getProducts.invalidate();

                              toast.success("Products deleted successfully.", {
                                id: loading,
                              });

                              setToDelete([]);
                            } catch (error) {
                              console.log(error);
                              toast.error(
                                "An error occurred while deleting the products.",
                              );
                            }
                          }}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <AddButton category={categoryData} />
              </div>
            </div>
            <Separator />
            {productsData.length === 0 && (
              <h1 className="mt-10 text-center">There are no products yet.</h1>
            )}

            {categories.map((categ) =>
              categ.id === queryCategory && categ.sub_categories.length > 0 ? (
                <div
                  className="grid grid-cols-3 justify-between gap-10 p-4 px-2 pr-6"
                  key={categ.id}
                >
                  {subCategories.map(
                    (sub) =>
                      sub.category === queryCategory && (
                        <div
                          className={cn("h-full w-full", {
                            hidden: querySub !== sub.id,
                            block: !querySub,
                          })}
                          key={sub.id}
                        >
                          <div className="flex items-center gap-x-2 px-2">
                            <h1 className="text-2xl font-bold capitalize text-brown">
                              {sub.name}
                            </h1>
                          </div>
                          <ul className="mt-5 divide-y rounded-sm">
                            {productsData.map(
                              (product) =>
                                sub.id === product.sub_category && (
                                  <li
                                    className="relative flex w-full items-center gap-2 px-2 py-3"
                                    key={product.id}
                                  >
                                    <Checkbox
                                      className=""
                                      checked={toDelete.some(
                                        (val) => val.id === product.id,
                                      )}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          setToDelete((val) => [
                                            ...val,
                                            {
                                              id: product.id,
                                              image: product.image,
                                            },
                                          ]);
                                        } else {
                                          setToDelete((val) =>
                                            val.filter(
                                              (del) => del.id !== product.id,
                                            ),
                                          );
                                        }
                                      }}
                                    />
                                    <Image
                                      src={product.image}
                                      alt={product.name}
                                      width={200}
                                      height={200}
                                      className="w-10 rounded-full"
                                    />
                                    <div className="w-full">
                                      <h1 className="font-semibold text-brown">
                                        {product.name}
                                      </h1>
                                      <p className="text-sm text-muted-foreground">
                                        {product.description}
                                      </p>
                                    </div>
                                    <button
                                      className=""
                                      onClick={() => setEditing(product)}
                                    >
                                      <Pencil
                                        size={19}
                                        className="opacity-40 transition-all duration-300 ease-in-out hover:opacity-100"
                                      />
                                    </button>
                                  </li>
                                ),
                            )}
                          </ul>
                        </div>
                      ),
                  )}
                </div>
              ) : (
                categ.id === queryCategory && (
                  <ul className="mt-5 flex flex-wrap w-full rounded-sm divide-x" key={categ.id}>
                    {productsData.map((product) => (
                      <li
                        className="relative flex w-full items-center gap-2 px-4 py-3 max-w-sm"
                        key={product.id}
                      >
                        <Checkbox
                          className=""
                          checked={toDelete.some(
                            (val) => val.id === product.id,
                          )}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setToDelete((val) => [
                                ...val,
                                {
                                  id: product.id,
                                  image: product.image,
                                },
                              ]);
                            } else {
                              setToDelete((val) =>
                                val.filter((del) => del.id !== product.id),
                              );
                            }
                          }}
                        />
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="w-10 rounded-full"
                        />
                        <div className="w-full">
                          <h1 className="font-semibold text-brown">
                            {product.name}
                          </h1>
                          <p className="text-sm text-muted-foreground">
                            {product.description}
                          </p>
                        </div>
                        <button
                          className=""
                          onClick={() => setEditing(product)}
                        >
                          <Pencil
                            size={19}
                            className="opacity-40 transition-all duration-300 ease-in-out hover:opacity-100"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                )
              ),
            )}
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
