import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient, createAdminClient } from "@/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // if "next" is in param, use it as the redirect URL

  if (code) {
    const supabase = await createClient();
    const supabaseAdmin = await createAdminClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    const { data: isExisting, error: existingError } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", data.user?.email ?? "")
      .maybeSingle();

    if (existingError) {
      console.log("ERROR", existingError);
    }

    if (!isExisting) {
      const { error: insertError } = await supabaseAdmin.from("users").insert({
        email: data.user?.email ?? "",
        name: (data.user?.user_metadata.name as string) ?? "",
      });

      if (insertError) {
        console.log("INSERT ERROR", insertError);
      }
    }

    if (!error) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/menu`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
