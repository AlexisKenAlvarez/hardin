"use client";
import type { RouterOutputs } from "@/server/api";
import { supabase } from "@/supabase/supabaseClient";
import { LayoutGrid, List, LogOut, Menu, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const AdminDashboard = ({
  session,
}: {
  session: RouterOutputs["auth"]["getSession"];
}) => {
  const router = useRouter();

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
          <div className="w-56"></div>
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
              <button className="rounded-full bg-brown p-2 text-white transition-all duration-300 ease-in-out hover:scale-[1.1]">
                <Plus />
              </button>
            </div>
            <Separator />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
