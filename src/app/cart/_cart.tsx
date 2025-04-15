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
import Nav from "@/components/Nav";
import type { Metadata } from "next";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";

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

const LENGTH = 8;

const Cart = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const matches = useMediaQuery("(min-width: 640px)");

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
      <div className="relative z-[60] flex min-h-screen w-full flex-col items-center justify-center gap-4 overflow-hidden  bg-green-bg px-2 py-6 drop-shadow-lg sm:gap-8 sm:py-20">
        <div className="relative z-10 flex flex-col items-center gap-5">
          <Nav />
          <div className="w-[90vw]">
            <Carousel
              setApi={setApi}
              className="flex select-none items-center"
              opts={{
                loop: true,
                align: "center",
              }}
            >
              <CarouselContent className="flex pt-24" containerStyle="h-[64vh]">
                {[...Array.from({ length: LENGTH })]?.map((_, i) => {
                  const bigger = i + 1 > current;
                  let rotateY = current === i + 1 ? 0 : bigger ? -30 : 30;
                  const scale = current === i + 1 ? 1.2 : 0.9;
                  const opacity = current === i + 1 ? 1 : 0.7;

                  if ([1, 2].includes(current) && i === LENGTH - 1) {
                    rotateY = 30;
                  }

                  if ([LENGTH, LENGTH - 1].includes(current) && i === 0) {
                    rotateY = -30;
                  }

                  return (
                    <CarouselItem
                      key={i}
                      className="shrink-0 !overflow-visible sm:basis-1/3"
                    >
                      {/* Apply perspective & rotation on the same element */}
                      <div
                        className="transition-all duration-500"
                        style={{
                          transform: matches
                            ? `perspective(1000px) rotateY(${rotateY}deg) scale(${scale})`
                            : "",
                          opacity: matches ? opacity : 1,
                        }}
                      >
                        <Image
                          alt={`${i}_cart`}
                          src={`/rental/${i + 1}.jpg`}
                          width={1000}
                          height={1000}
                          className="w-full"
                        />
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="translate-x-full rounded-none border-0 bg-black text-white" />
              <CarouselNext className="-translate-x-full rounded-none border-0 bg-black text-white" />
            </Carousel>
          </div>
        </div>
        <div className="absolute bottom-0 h-[50vh] w-full bg-hero-bg"></div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
