import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import AdminLogin from "./_login";
const page = async () => {
  const supabase = await createClient();

  const { data: session } = await supabase.auth.getSession();
  
  if (session.session) {
    redirect("/admin/menu");
  }

  return (
    <div>
      <AdminLogin />
    </div>
  );
};

export default page;
