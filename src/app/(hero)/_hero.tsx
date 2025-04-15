"use client";

import Container from "@/components/Container";
import Nav from "@/components/Nav";
import CustomButton from "@/components/ui/CustomButton";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const Hero = () => {
  const { theme, setTheme } = useTheme();
  const containerRef = useRef(null);
  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-container",
        {
          zIndex: 20,
        },
        {
          zIndex: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom 30%",
            end: "bottom start",
            scrub: true,
          },
        },
      );
    },
    {
      scope: containerRef,
    },
  );

  const handleTheme = (theme: string) => {
    setTheme(theme);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden" ref={containerRef}>
      <div className="hero-container fixed flex min-h-screen w-full items-center  justify-center bg-hero-bg dark:bg-green-bg">
        <Nav />
        <Container className="z-10 flex justify-center text-center md:justify-start md:text-left">
          <div className="max-w-xl space-y-2">
            <h1 className="font-bold uppercase text-orange">Hardin Cafe</h1>
            <h1 className="font-primary text-3xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl">
              Explore a drink, made just for you.
            </h1>
            <p className="mx-auto max-w-md text-sm opacity-70 sm:text-base md:mx-0">
              Whether you prefer your espresso smooth or bold, discover your
              perfect drink today!
            </p>
            <CustomButton className="!mt-10"  asChild>
              <Link href="/menu" className="block w-fit">View Menu</Link>
            </CustomButton>
            <div className="!mt-24 flex w-full flex-row justify-center gap-3 md:justify-start">
              <button
                className="h-14 w-14 rounded-full border border-black bg-button-shadow transition-all duration-300 ease-in-out hover:scale-[1.1]"
                onClick={() => handleTheme("light")}
              />
              <button
                className="h-14 w-14 rounded-full border border-black bg-green-primary transition-all duration-300 ease-in-out hover:scale-[1.1]"
                onClick={() => handleTheme("dark")}
              />
            </div>
          </div>
        </Container>
        <Image
          src="/hero/elements.png"
          alt="Elements_hero"
          width={1300}
          height={1300}
          className="absolute left-0 right-0 mx-auto w-[48rem] translate-y-1/4 opacity-50 md:bottom-44 md:left-auto md:right-[-9rem] md:mx-0 md:w-[54rem] xl:bottom-72 xl:right-[-20rem] xl:w-[80rem]"
        />
        <Image
          src="/spill/left.png"
          alt="Left_hero"
          width={1300}
          height={1300}
          className="absolute left-0 hidden w-[28rem] opacity-30 lg:block"
        />
        <AnimatePresence>
          {theme === "light" ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              key="light_coffee"
              className="absolute -bottom-36 left-0 right-0 mx-auto  origin-bottom md:-bottom-28 md:left-auto md:right-24"
            >
              <Image
                src="/hero/coffee.webp"
                alt="Coffee_hero"
                width={1300}
                height={1300}
                className=" mx-auto  w-[20rem] md:w-[24rem] xl:w-[34rem]"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              key="dark_coffee"
              className="absolute -bottom-36 left-0 right-0 mx-auto  origin-bottom md:-bottom-28 md:left-auto md:right-24"
            >
              <Image
                src="/hero/green_coffee.webp"
                alt="Coffee_hero"
                width={1300}
                height={1300}
                className=" mx-auto  w-[20rem] md:w-[24rem] xl:w-[34rem]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Hero;
