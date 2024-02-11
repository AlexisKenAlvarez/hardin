"use client";

import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { RouterOutputs } from "@/server/api";

const AdminLogin = ({
  session,
}: {
  session: RouterOutputs["auth"]["getSession"];
}) => {
  const supabase = createClientComponentClient<Database>();

  const router = useRouter()
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });
  type FormType = z.infer<typeof formSchema>;
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (session?.data.session) return null;

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

          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(async (data: FormType) => {
                  const result = await supabase.auth.signInWithPassword({
                    email: data.email,
                    password: data.password,
                  });
                  console.log("🚀 ~ onSubmit={form.handleSubmit ~ result:", result)

                  if (result.error) {
                    form.setError("email", { message: result.error.message });
                  }
                  router.refresh()
                })}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="alexisken@gmail.com"
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="********"
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="mx-auto block w-full">Login</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
