import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminLogin from "@/components/admin/AdminLogin";
import createSupabaseServerClient from "@/supabase/server";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const page = async ({
  searchParams,
}: {
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const supabase = await createSupabaseServerClient();
  const session = await supabase.auth.getSession();

  const category = searchParams.category as string;
  const sub = searchParams.sub as string;

  const categories = await api.products.getCategories.query();
  const subCategories = await api.products.getSubCategories.query()

  const queryCategory = category
    ? categories.find((val) => val.name === category)!.id
    : categories[0]?.id ?? 0;

  const querySub = sub ? subCategories.find((val) => val.name === sub)!.id : null;

  const products = await api.products.getProducts.query({
    category: queryCategory,
    sub_category: querySub,
  });

  if (
    session.data.session &&
    session.data.session.user.email !== "alexisken1432@gmail.com"
  )
    redirect("/");

  return (
    <section className="relative min-h-screen w-full">
      <AdminLogin session={session} />
      <AdminDashboard
        session={session}
        categories={categories}
        products={products}
        queryCategory={queryCategory}
        querySub={querySub}
        subCategories={subCategories}
      />
    </section>
  );
};

export default page;
