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

const AdminDashboard = ({
  session,
  categories,
}: {
  session: RouterOutputs["auth"]["getSession"];
  categories: Category
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
          <div className="w-56 p-5 text-xl">
            {categoryData.map((category) => (
              <button
                className="group relative block py-2"
                key={category.id}
                onClick={() => handleCategory(category.name)}
              >
                <h1
                  className={cn("", {
                    "d font-bold text-brown":
                      searchParams.get("category") === category.name,
                    "font-bold text-brown":
                      searchParams.get("category") === null &&
                      category.name === "drinks",
                  })}
                >
                  {category.name}
                </h1>
                <div
                  className={cn(
                    "absolute left-0 right-0 mx-auto h-1 w-0 bg-brown transition-all duration-300 ease-in-out group-hover:w-full",
                    {
                      "d w-full":
                        searchParams.get("category") === category.name,
                      "w-full":
                        searchParams.get("category") === null &&
                        category.name === "drinks",
                    },
                  )}
                ></div>
              </button>
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
