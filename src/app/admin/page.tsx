import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminLogin from "@/components/admin/AdminLogin";
import createSupabaseServerClient from "@/supabase/server";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"

const page = async () => {
  const supabase = await createSupabaseServerClient()
  const session = await supabase.auth.getSession()

  const categories = await api.products.getCategories.query()

  if (
    session.data.session &&
    session.data.session.user.email !== "alexisken1432@gmail.com"
  )
    redirect("/");

  return (
    <section className="relative min-h-screen w-full">
      <AdminLogin session={session} />
      <AdminDashboard session={session} categories={categories} />
    </section>
  );
};

export default page;
