import { cn } from "@/lib/utils";
import { AlignJustify } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";

const Nav = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
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

  const navList = [
    {
      label: "Twitter",
      link: "",
    },

    {
      label: "Telegram",
      link: "",
    },
    {
      label: "Dextools",
      link: "",
    },
    {
      label: "Telegram",
      link: "",
    },
  ];

  return (
    <nav
      className={cn(
        "w-full lg:py-8 py-7 transition-all ease-in-out duration-300 font-secondary fixed top-0 left-0 px-6 bg-white/0 z-20",
        {
          "!py-4 bg-white/100": scrollPosition > 100,
        }
      )}
    >
      <div className="max-w-screen-2xl flex items-center mx-auto justify-center">
        <div className="w-full grid lg:place-content-center">
          <Image width="500" height="500" src="/logo.webp" alt="mini_logo" className="w-10" />
        </div>
        <ul className="w-full hidden items-center justify-center gap-x-10 lg:flex">
          {navList.map((items) => (
            <li key={items.label}>{items.label}</li>
          ))}
        </ul>
        <div className="w-full flex items-center justify-end gap-x-3 lg:justify-center">
          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden block">
                <AlignJustify />
              </button>
            </SheetTrigger>
            <SheetContent>
              <div className="w-full h-full bg-white font-secondary">
              <Image width="500" height="500" src="/logo.webp" alt="mini_logo" className="w-14 mx-auto" />
                <ul className="w-full flex flex-col items-center justify-center gap-y-10 mt-10">
                  {navList.map((items) => (
                    <li key={items.label}>{items.label}</li>
                  ))}
                </ul>
              </div>  
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Nav;