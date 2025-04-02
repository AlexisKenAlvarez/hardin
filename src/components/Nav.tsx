/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type Dispatch, type SetStateAction, useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Image from "next/image";
const NAV_ITEMS = [
  {
    label: "About",
    slug: "about",
  },
  {
    label: "Hours",
    slug: "hours",
  },
  {
    label: "Gallery",
    slug: "gallery",
  },
];

export const SOCIALS = [
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav
        className={cn(
          "fixed left-0 top-0 z-50 flex w-full items-center justify-between p-5 font-secondary",
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
              "fixed left-0 top-0 z-50 flex h-screen w-full flex-row items-start bg-white/80 p-5 font-secondary backdrop-blur-sm transition-all duration-500 ease-in-out lg:py-4",
            )}
          >
            <div className="flex h-full w-full flex-row items-start">
              <NavElements setIsOpen={setIsOpen} isOpen={isOpen} />
            </div>

            <ul className="absolute left-0 right-0 top-28 mx-auto flex w-fit flex-col gap-4 space-y-5 text-center">
              <AnimatePresence>
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 100, y: 0 }}
                    transition={{
                      duration: 0.4,

                      delay: index * 0.05,
                    }}
                    key={index}
                    className=""
                  >
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
          {!isOpen ? <Menu className="" /> : <X className="text-orange" />}
        </button>
      </div>
      <div className="flex w-full flex-row items-center justify-center lg:justify-start">
        <Image
          src={"/logo-white.png"}
          width={500}
          height={500}
          alt="nav_logo"
          className="hidden w-14 invert lg:block"
        />
        <h1
          className={cn(
            "font-hardin flex flex-col text-center text-xl font-normal uppercase leading-none  lg:text-left",
            {
              "text-orange": isOpen,
            },
          )}
        >
          Hardin <br />
          Cafe
        </h1>
      </div>
      <ul
        className={cn(
          "hidden w-full items-center justify-center gap-4  lg:flex",
          {
            "text-orange": isOpen,
          },
        )}
      >
        {NAV_ITEMS.map((item, index) => (
          <li
            key={index}
            className="uppercase font-medium"
            onClick={() => {
              const html = document.documentElement; // <html> element
              html.classList.add("page-active");

              setTimeout(() => {
                html.classList.remove("page-active");
              }, 500);
            }}
          >
            <a href={`#${item.slug}`}>
              <p className="px-4">{item.label}</p>
            </a>
          </li>
        ))}
      </ul>

      <ul className={cn("flex w-full items-center justify-end gap-2 lg:gap-4")}>
        {SOCIALS.map((item, index) => (
          <a
            href={`${item.url}`}
            rel="noopener noreferrer"
            target="_blank"
            key={index}
          >
            <li
              className={cn(
                "flex items-center rounded-full border border-black bg-orange dark:bg-green-primary py-2 px-2",
                {
                  "text-orange": isOpen,
                },
              )}
            >
              <item.icon
                className="text-xl text-white lg:text-base "
                size={24}
              />
            </li>
          </a>
        ))}
      </ul>
    </>
  );
};
