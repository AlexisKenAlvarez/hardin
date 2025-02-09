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
      <div className="mx-auto max-w-screen-lg">
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
        <div className="mt-10">
          <Carousel
            opts={{
              align: "start",
            }}
          >
            <CarouselContent>
              {categoriesData.map((item) => {
                return (
                  <CarouselItem key={item.name} className="basis-1/4">
                    <div className="relative h-fit w-fit overflow-hidden">
                      <motion.div style={{ translateX }} className="">
                        <Image
                          src={`/categories/${item.image}.webp`}
                          alt={item.name}
                          width={700}
                          height={700}
                          className="h-[25rem] scale-125 object-cover"
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
