/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const Nav = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(-1);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function onScroll({ direction }: { direction: number }) {
    setScrollDirection(direction);
  }

  useEffect(() => {
    void (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      new LocomotiveScroll({
        scrollCallback: onScroll,
      });
    })();
  }, []);

  const navList = [
    {
      label: "Menu",
      link: "",
    },
    {
      label: "About",
      link: "",
    },
    {
      label: "Gallery",
      link: "",
    },
    {
      label: "Location",
      link: "",
    },
  ];

  return (
    <nav
      className={cn(
        "font-secondary fixed left-0 top-0 z-20 w-full translate-y-0 bg-white/40 px-8 py-4 backdrop-blur-sm transition-all duration-300 ease-in-out",
        {
          "bg-white/100": scrollPosition > 100,
        },
        { "-translate-y-full": scrollDirection === 1 },
      )}
    >
      <div className="mx-auto flex items-center justify-center">
        <div className="w-full">
          <Image
            width="500"
            height="500"
            src="/logo.webp"
            alt="mini_logo"
            className="w-14"
          />
        </div>

        <div className="flex w-full items-center justify-end gap-x-3">
          <Sheet>
            <SheetTrigger asChild>
              <button className="block lg:hidden">
                <AlignJustify size={20} />
              </button>
            </SheetTrigger>
            <SheetContent>
              <div className="font-secondary h-full w-full bg-white">
                <Image
                  width="500"
                  height="500"
                  src="/logo.webp"
                  alt="mini_logo"
                  className="mx-auto w-14"
                />
                <ul className="mt-10 flex w-full flex-col items-center justify-center gap-y-10">
                  {navList.map((items) => (
                    <li key={items.label}>{items.label}</li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
          <div className="hidden items-center gap-10 lg:flex">
            <ul className="flex gap-x-10">
              {navList.map((items) => (
                <li key={items.label}>{items.label}</li>
              ))}
            </ul>
            <Button className="rounded-full">Message us</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
