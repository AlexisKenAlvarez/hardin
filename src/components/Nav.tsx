/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
const NAV_ITEMS = [
  {
    label: "Home",
    slug: "home",
  },
  {
    label: "Menu",
    slug: "",
  },
  {
    label: "Hours",
    slug: "hours",
  },
  {
    label: "Location",
    slug: "location",
  },
];

const SOCIALS = [
  {
    label: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/hardincafe",
  },
  {
    label: "Facebook",
    icon: FaFacebook,
    url: "https://www.facebook.com/profile.php?id=61553926187351",
  },
];

const Nav = () => {
  let isScrolling: string | number | NodeJS.Timeout | undefined;
  const [isOpen, setIsOpen] = useState(false);

  function onScroll() {
    const iframe = document.getElementById("myIframe");

    iframe?.classList.add("no-pointer-events");
    // Clear timeout if it exists
    clearTimeout(isScrolling);

    isScrolling = setTimeout(() => {
      iframe?.classList.remove("no-pointer-events");
    }, 200); // Adjust the timeout delay if necessary
  }

  useEffect(() => {
    void (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      new LocomotiveScroll({
        scrollCallback: onScroll,
      });
    })();
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-white/80  p-3 py-3 font-sans backdrop-blur-sm transition-all duration-500 ease-in-out lg:py-4",
        )}
      >
        <NavElements setIsOpen={setIsOpen} isOpen={isOpen} />
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            id="nav_mobile"
            className={cn(
              "fixed left-0 top-0 z-50 flex h-screen w-full flex-row items-start bg-white/80 p-3 py-3 font-sans backdrop-blur-sm transition-all duration-500 ease-in-out lg:py-4",
            )}
          >
            <div className="flex h-full w-full flex-row items-start">
              <NavElements setIsOpen={setIsOpen} isOpen={isOpen} />
            </div>

            <ul className="flex space-y-5 flex-col gap-4 absolute top-28 mx-auto text-center w-fit left-0 right-0">
              <AnimatePresence>
                {NAV_ITEMS.map((item, index) => (
                  <motion.li initial={{opacity: 0, y: -10}}
                   animate={{opacity: 100, y: 0}}
                   transition={{
                    duration: 0.4,

                    delay: index * 0.05
                   }}
                   key={index} className="">
                    <a href={`#${item.slug}`}>
                      <p className="px-4 text-xl">{item.label}</p>
                    </a>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;

const NavElements = ({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}) => {
  return (
    <>
      <div className="block w-full lg:hidden">
        <button
          className="rounded-md border border-orange/10 p-2"
          onClick={() => setIsOpen((current) => !current)}
        >
          {!isOpen ? (
            <Menu className="text-orange" />
          ) : (
            <X className="text-orange" />
          )}
        </button>
      </div>

      <ul
        className={cn("hidden w-full items-center gap-4  text-orange lg:flex")}
      >
        {NAV_ITEMS.map((item, index) => (
          <li key={index} className="">
            <a href={`#${item.slug}`}>
              <p className="px-4">{item.label}</p>
            </a>
          </li>
        ))}
      </ul>
      <div className="flex w-full justify-center">
        <h1 className="flex flex-col text-center font-secondary text-xl font-bold uppercase leading-none text-orange">
          Hardin <span className="font-normal">Cafe</span>
        </h1>
      </div>
      <ul className={cn("flex w-full items-center justify-end lg:gap-4")}>
        {SOCIALS.map((item, index) => (
          <a
            href={`${item.url}`}
            rel="noopener noreferrer"
            target="_blank"
            key={index}
          >
            <li className="flex items-center  gap-2 rounded-full px-2 py-2 text-orange lg:px-4">
              <item.icon className="text-xl lg:text-base" />
              <p className="hidden lg:block">{item.label}</p>
            </li>
          </a>
        ))}
      </ul>
    </>
  );
};
