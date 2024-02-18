"use client";
import type { RouterOutputs } from "@/server/api";
import { supabase } from "@/supabase/supabaseClient";
import { LayoutGrid, List, LogOut, Menu } from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import AddButton from "./AddButton";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "../ui/button";
import { ChevronsUpDown, MoreVertical } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

const AdminDashboard = ({
  session,
  categories,
  products,
  queryCategory,
}: {
  session: RouterOutputs["auth"]["getSession"];
  categories: Category;
  products: RouterOutputs["products"]["getProducts"];
  queryCategory: number;
}) => {
  const searchParams = useSearchParams();

  const router = useRouter();
  const pathname = usePathname();

  const { data: categoryData } = api.products.getCategories.useQuery(
    undefined,
    { initialData: categories },
  );

  const { data: productsData } = api.products.getProducts.useQuery(
    {
      category: queryCategory,
    },
    {
      initialData: products,
    },
  );

  function handleCategory(value: string, type: "category" | "sub") {
    const params = new URLSearchParams(searchParams);

    if (type == "category") {
      params.set("category", value);
    } else {
      params.set("sub", value);
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  const brown = "#76422C";
  const [productView, setProductView] = useState("grid");

  if (!session?.data.session) return null;

  return (
    <section className="flex min-h-screen w-full bg-bg p-2">
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
          <div className="w-56 p-4">
            <h1 className="mb-5 font-primary text-xl font-medium">
              Categories:
            </h1>

            {categoryData.map((category) => (
              <div className="" key={category.id}>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="group relative w-full justify-between text-lg"
                      onClick={() => handleCategory(category.name, "category")}
                    >
                      <h1
                        className={cn("", {
                          "d  text-brown":
                            searchParams.get("category") === category.name,
                          " text-brown":
                            searchParams.get("category") === null &&
                            category.name === "drinks",
                        })}
                      >
                        {category.name}
                      </h1>
                      {category.sub_categories.length > 0 && (
                        <ChevronsUpDown size={16} />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {category.sub_categories.map((sub) => (
                      <div
                        className="ml-4 flex items-center border-l-2"
                        key={sub.id}
                      >
                        <div className="inline-block h-[2px] w-3 bg-black/10"></div>
                        <div
                          className={cn("w-full cursor-pointer justify-start flex pl-2 py-1 hover:bg-slate-100", {
                            "text-brown font-medium": searchParams.get("sub") === sub.name,
                          })}
                          onClick={() => {
                            handleCategory(sub.name, "sub");
                          }}
                        >
                          {sub.name}
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>
          <Separator orientation="vertical" className="h-full" />
          <div className="w-full">
            <div className="flex w-full items-center justify-end gap-3 px-4 py-3">
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
            <Separator />
            <div className="grid w-fit grid-cols-4 gap-5 p-5">
              {productsData.map((product) => (
                <div
                  className="relative flex w-full bg-neutral-100"
                  key={product.id}
                >
                  <button className="absolute right-0 top-2 opacity-50 hover:opacity-100">
                    <MoreVertical />
                  </button>
                  <Image
                    className="h-52 w-36 shrink-0 object-cover"
                    alt={product.name}
                    src={product.image}
                    width={700}
                    height={700}
                  />
                  <div className="w-60 p-5">
                    <h1 className="font-secondary text-xl font-extrabold text-brown">
                      {product.name}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {product.description}
                    </p>

                    <p className="mt-5 text-lg font-bold text-lime-500">
                      P{product.price}.00
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
