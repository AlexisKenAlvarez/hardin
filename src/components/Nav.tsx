/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import NavButton from "./ui/NavButton";

const Nav = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(-1);
  console.log("🚀 ~ Nav ~ scrollDirection:", scrollDirection);

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
  let isScrolling: string | number | NodeJS.Timeout | undefined;

  function onScroll({ direction }: { direction: number }) {
    setScrollDirection(direction);

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
        onScroll: () => {
          console.log("scrolling");
        },
      });
    })();
  }, []);

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


  return (
    <nav
      className={cn(
        "absolute left-0 top-0 z-50 hidden w-full items-start justify-between bg-gradient-to-b from-white/30 to-transparent p-5 font-sans transition-all duration-500 ease-in-out lg:flex"
      )}
    >
      <ul className={cn("flex w-full items-center gap-4 text-white")}>
        {NAV_ITEMS.map((item, index) => (
          <li key={index} className="">
            <a href={`#${item.slug}`}>
              <NavButton>{item.label}</NavButton>
            </a>
          </li>
        ))}
      </ul>
      <div className="flex w-full justify-center">
        <Image
          alt="logo"
          width={150}
          height={150}
          src="/logo-white.png"
          className={cn("w-28 transition-all duration-500 ease-in-out")}
        />
      </div>
      <ul className={cn("flex w-full items-center justify-end gap-4")}>
        {SOCIALS.map((item, index) => (
          <a
            href={`${item.url}`}
            rel="noopener noreferrer"
            target="_blank"
            key={index}
          >
            <li className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white">
              <item.icon />
              <p>{item.label}</p>
            </li>
          </a>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
