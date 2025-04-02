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
        <Container className="z-10 md:text-left text-center flex justify-center md:justify-start">
          <div className="max-w-xl space-y-2">
            <h1 className="font-bold uppercase text-orange">Hardin Cafe</h1>
            <h1 className="font-primary text-3xl sm:text-4xl md:text-5xl leading-tight xl:text-6xl">
              Explore a drink, made just for you.
            </h1>
            <p className="max-w-md opacity-70 md:mx-0 mx-auto sm:text-base text-sm">
              Whether you prefer your espresso smooth or bold, discover your
              perfect drink today!
            </p>
            <CustomButton className="!mt-10">View Menu</CustomButton>
            <div className="!mt-24 flex gap-3 w-full flex-row md:justify-start justify-center">
              <button
                className="h-14 w-14 rounded-full bg-button-shadow border border-black hover:scale-[1.1] transition-all ease-in-out duration-300"
                onClick={() => handleTheme("light")}
              />
              <button
                className="h-14 w-14 rounded-full bg-green-primary border border-black hover:scale-[1.1] transition-all ease-in-out duration-300"
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
                className=" w-[20rem]  md:w-[24rem] xl:w-[34rem] mx-auto"
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
                className=" w-[20rem]  md:w-[24rem] xl:w-[34rem] mx-auto"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Hero;
