/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Nav = () => {
  const [, setScrollPosition] = useState(0);
  const [, setScrollDirection] = useState(-1);

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

  return (
    <nav className="fixed left-0 top-0 z-50 flex w-full items-start justify-between p-5 font-sans">
      <ul className="flex w-full items-center gap-4">
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
          className="w-28"
        />
      </div>
      <ul className="w-full flex items-center justify-end gap-4">
        {SOCIALS.map((item, index) => (
          <a
            href={`${item.url}`}
            rel="noopener noreferrer"
            target="_blank"
            key={index}
            
          >
            <li className="rounded-full bg-white/10 px-4 py-2 items-center gap-2 text-white flex">
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
