"use client";

import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
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


const AdminLogin = () => {
  const supabase = createClientComponentClient<Database>()
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

  return (
    <>
      <div className="flex flex-col items-center space-y-4 sm:mt-0 mt-16">
        <Image
          src="/logo.webp"
          alt="Logo"
          width={800}
          height={800}
          className="w-16"
        />

        <div className="text-center font-primary text-6xl sm:text-7xl text-brown">
          <h1 className="">HARDIN</h1>
          <h1 className="">CAFE</h1>
        </div>
      </div>

      <div className="mt-10 h-full w-full sm:max-w-sm rounded-md border-black/60 bg-white/40 p-5 pb-10 backdrop-blur-md sm:h-auto sm:border">
        <h2 className="text-center font-primary text-primary">ADMIN</h2>

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (data: FormType) =>
                {
                  const result = await supabase.auth.signInWithPassword({
                    email: data.email,
                    password: data.password,
                  })

                  if (result.error) {
                    form.setError("email", { message: result.error.message })
                  } else {
                    router.push("/")
                  }

                }
              )}
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
                      <Input {...field} type="password" placeholder="********"></Input>
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
    </>
  );
};

export default AdminLogin;
