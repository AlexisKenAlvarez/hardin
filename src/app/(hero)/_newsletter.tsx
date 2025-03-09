"use client";

import CustomButton from "@/components/ui/CustomButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const NewsLetter = () => {
  const inputSchema = z.object({
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof inputSchema>>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof inputSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="w-full bg-white px-3 pb-10 sm:!pb-32 font-sans drop-shadow-xl  sm:px-10 sm:py-10">
      <div className="mx-auto w-full rounded-lg bg-bg-secondary p-10 sm:max-w-screen-lg">
        <div className="space-y-3 text-center">
          <h3 className="font-bold text-orange">SUBSCRIBE TO OUR NEWSLETTER</h3>
          <h1 className="header font-primary">Stay updated with our latest</h1>
          <p className="sub-header">
            Subscribe to our newsletter to receive latest updates such as new
            promos, events, and more!
          </p>
        </div>
        <div className="mt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-start justify-center gap-2 sm:flex-row"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full max-w-sm">
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className="w-full border-0 py-[22px] outline-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-medium italic text-red-500" />
                  </FormItem>
                )}
              />
              <CustomButton
                type="submit"
                variant="black"
                className="w-full rounded-lg text-sm sm:w-24"
              >
                Submit
              </CustomButton>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
