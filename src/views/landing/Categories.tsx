"use client";

import Button from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
const categoriesData = [
  {
    name: "Coffee",
    image: "coffee",
  },
  {
    name: "Croffles",
    image: "croffle",
  },
  {
    name: "Pasta",
    image: "pasta",
  },
  {
    name: "Sandwiches",
    image: "sandwich",
  },
  {
    name: "Rice Meals",
    image: "rice_meal",
  },
  {
    name: "Cheesecakes",
    image: "cheesecake",
  },
  {
    name: "Snacks",
    image: "snacks",
  },
];

const Categories = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["30% end", "end start"],
  });

  const translateX = useTransform(scrollYProgress, [0, 1], [0, 35]);

  return (
    <div className="bg-white py-10 md:py-20" ref={ref}>
      <div className="mx-auto max-w-screen-lg px-6">
        <div className="space-y-2 text-center">
          <p className="font-sans text-lg font-bold text-orange">
            JUST FOR YOU
          </p>
          <h1 className="header mx-auto max-w-md">More than just coffee</h1>
          <p className="sub-header mx-auto max-w-xl">
            Enjoy a variety of flavors—from savory rice meals to sweet croffles,
            creamy pasta, rich cheesecakes, tasty sandwiches and snacks.
            There&apos;s something for everyone!
          </p>
          <Button variant="black" className="mx-auto !mt-10">
            View Full Menu
          </Button>
        </div>
        <div className="mt-10 px-10">
          <Carousel
            opts={{
              align: "start",
            }}
          >
            <CarouselContent>
              {categoriesData.map((item) => {
                return (
                  <CarouselItem key={item.name} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div className="relative h-fit w-fit overflow-hidden">
                      <div className="absolute left-0 top-0 z-10 flex h-full w-full items-end justify-center bg-black/40 pb-4">
                        <div className="flex items-center flex-col gap-2">
                          <Image
                            src={`/categories/icons/${item.image}.png`}
                            alt={item.name}
                            width={200}
                            height={200}
                            className="w-9"
                          />
                          <h2 className="font-sans font-medium text-white">
                            {item.name}
                          </h2>
                        </div>
                      </div>
                      <motion.div style={{ translateX }} className="">
                        <Image
                          src={`/categories/${item.image}.webp`}
                          alt={item.name}
                          width={700}
                          height={700}
                          className="h-[25rem] scale-[1.3] object-cover"
                        />
                      </motion.div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Categories;
