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
import { ChevronsUpDown } from "lucide-react";
import { Toggle } from "@/components/ui/toggle"

const AdminDashboard = ({
  session,
  categories,
}: {
  session: RouterOutputs["auth"]["getSession"];
  categories: Category;
}) => {
  
  const { data: categoryData } = api.products.getCategories.useQuery(
    undefined,
    { initialData: categories },
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleCategory(value: string) {
    const params = new URLSearchParams(searchParams);

    params.set("category", value);

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
            <h1 className="mb-5 text-xl font-medium font-primary">Categories:</h1>

            {categoryData.map((category) => (
              <div className="" key={category.id}>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="group relative w-full justify-between text-lg"
                      onClick={() => handleCategory(category.name)}
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
                        <Toggle className="w-full justify-start">{sub.name}</Toggle>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
