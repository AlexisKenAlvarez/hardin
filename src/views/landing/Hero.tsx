"use client";

import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <>
      <Nav />
      <div className="relative min-h-screen w-full bg-black">
        <div className="fixed left-0 top-0 h-full w-full">
          <Image
            alt="background_image"
            width={1500}
            height={1500}
            src={"/hero-bg-1.webp"}
            className="h-full w-full object-cover brightness-[.85]"
          />
          <h1 className="font-title absolute left-0 top-0 text-[25vw] font-black text-white">
            HARDIN
          </h1>
          <Image
            alt="coffee_image"
            width={1500}
            height={1500}
            src={"/coffee-1.png"}
            className="absolute left-0 top-0 h-full w-full object-cover"
          />

          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
        </div>

        <div className="absolute bottom-10 left-0 flex-col items-center right-0 z-10 mx-auto flex w-full  justify-center gap-4">
          <div className="flex gap-4">
            <Button className="gap-2">
              <p>See Menu</p>
              <ArrowRight strokeWidth={1} className="opacity-60" />
            </Button>
            <Button variant={"outline"} className="gap-2">
              <p>Directions</p>
              <MapPin strokeWidth={1} className="opacity-60" />
            </Button>
          </div>

          <p className="font-sans text-white font-medium text-lg">Coffee, crafted in nature.</p>
        </div>
      </div>
    </>
  );
};

export default Hero;
