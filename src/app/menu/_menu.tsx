"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import Footer from "@/components/Footer";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LoadingPage } from "../loading";
import { AnimatePresence } from "framer-motion";
import { motion } from "motion/react";

export const metadata: Metadata = {
  title: "Menu",
};

export interface MenuData {
  created_at: string;
  id: number;
  image: string;
  order: number;
  uploaded_by: string;
}

const Menu = ({ data }: { data: MenuData[] | null }) => {
  const [imageLoaded, setImageLoading] = React.useState(false);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <div className="relative z-[60] flex min-h-screen w-full flex-col items-center justify-center gap-4  overflow-hidden px-2 py-6 drop-shadow-lg sm:gap-8 sm:py-20">
        <Image
          alt="background"
          src={"/menu_bg.webp"}
          width={1500}
          height={1500}
          onLoad={() => setImageLoading(true)}
          priority
          className="absolute left-0 top-0 h-full w-full object-cover"
        />
        <AnimatePresence mode="wait">
          {imageLoaded ? (
            <motion.div
              key={"menu-container"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative z-10 flex flex-col items-center gap-5"
            >
              <Link href={"/"}>
                <Image
                  alt="logo"
                  src={"/logo.webp"}
                  width={200}
                  height={200}
                  className="w-20"
                />
              </Link>
              <div className=" max-w-[28rem]">
                <Carousel setApi={setApi} className="">
                  <CarouselContent className="">
                    {data?.map((item) => (
                      <CarouselItem key={item.id}>
                        <Image
                          alt={item.id.toString()}
                          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.image}`}
                          width={1000}
                          height={1000}
                          className="w-full"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="translate-x-full rounded-none border-0 bg-black text-white" />
                  <CarouselNext className="-translate-x-full rounded-none border-0 bg-black text-white" />
                </Carousel>
              </div>
            </motion.div>
          ) : (
            <motion.div key={"menu-loader"} 
            exit={{ opacity: 0 }}
            className="fixed left-0 top-0 h-screen w-full">
              <LoadingPage />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {imageLoaded && <Footer />}
    </>
  );
};

export default Menu;
