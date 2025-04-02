"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "./providers/SupabaseSessionProvider";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";

export function NavUser() {
  const session = useSession();
  const supabase = createClient();
  const router = useRouter();

  if (!session) {
    return null;
  }

  const user = session.user;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground font-secondary"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={(user?.user_metadata?.avatar_url as string) ?? ""}
                  alt={(user?.user_metadata?.name as string) ?? ""}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user.user_metadata?.full_name}
                </span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={"top"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem
              className="gap-2"
              onClick={async () => {
                await supabase.auth.signOut();
                router.refresh();
              }}
            >
              <LogOut />
              <p className="font-secondary">Log out</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
