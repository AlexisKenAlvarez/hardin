import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminLogin from "@/components/admin/AdminLogin";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"

const page = async () => {
  const session = await api.auth.getSession.query();
  // console.log("🚀 ~ page ~ session:", session)
  const products = await api.products.getCategories.query()
  console.log("🚀 ~ page ~ products:", products)

  if (
    session.data.session &&
    session.data.session.user.email !== "alexisken1432@gmail.com"
  )
    redirect("/");

  return (
    <section className="relative min-h-screen w-full">
      <AdminLogin session={session} />
      <AdminDashboard session={session} />
    </section>
  );
};

export default page;
