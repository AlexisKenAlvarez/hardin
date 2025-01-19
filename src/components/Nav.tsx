/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

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

  const show_nav = scrollDirection === -1 && scrollPosition > 100;

  return (
    <nav
      className={cn(
        "fixed left-0 top-0 drop-shadow-md z-50 flex w-full items-start justify-between p-5 font-sans transition-all duration-500 ease-in-out",
        {
          "-translate-y-full opacity-0": scrollDirection === 1,
          "bg-white": show_nav,
        },
      )}
    >
      <ul
        className={cn("flex w-full items-center gap-4", {
          invert: show_nav,
        })}
      >
        {NAV_ITEMS.map((item, index) => (
          <li
            key={index}
            className="rounded-full bg-white/10 px-4 py-2 text-white"
          >
            <a href={`#${item.slug}`}>{item.label}</a>
          </li>
        ))}
      </ul>
      <div className="flex w-full justify-center">
        <Image
          alt="logo"
          width={150}
          height={150}
          src="/logo-white.png"
          className={cn('w-28 transition-all ease-in-out duration-500', {
            'invert w-10': show_nav
          })}
        />
      </div>
      <ul className={cn("flex w-full items-center justify-end gap-4", {
        invert: show_nav,
      })}>
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
