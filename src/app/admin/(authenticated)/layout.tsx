import AdminLayout from "@/components/admin/AdminLayout";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();

  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    return redirect("/admin/login");
  }

  return <AdminLayout>{children}</AdminLayout>;
};

export default Layout;
