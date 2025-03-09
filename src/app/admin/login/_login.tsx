"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/supabase/client";
import Image from "next/image";

const AdminLogin = () => {
  const supabase = createClient();

  return (
    <>
      <Image
        src="/background.webp"
        alt="Background"
        width={1500}
        height={1500}
        className="absolute left-0 top-0 h-full w-full object-cover object-bottom"
      />
      {/* <h1 className="text-black text-5xl relative z-10">Hello</h1> */}
      <div className="relative flex h-screen w-full flex-col items-center justify-center">
        <div className="mt-16 flex flex-col items-center space-y-4 sm:mt-0">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={800}
            height={800}
            className="w-16"
          />

          <div className="text-center font-primary text-6xl text-brown sm:text-7xl">
            <h1 className="">HARDIN</h1>
            <h1 className="">CAFE</h1>
          </div>
        </div>

        <div className="mt-10 h-full w-full rounded-md border-black/60 bg-white/40 p-5 pb-10 backdrop-blur-md sm:h-auto sm:max-w-sm sm:border">
          <h2 className="text-center font-primary text-primary">ADMIN</h2>

          <Button
            onClick={async () => {
              await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                  redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
                },
              });
            }}
            className="mx-auto"
          >
            Login with Google
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
