"use client";
import Container from "@/components/Container";
import Image from "next/image";

const Hero = () => {
  return (
    <>
      <Container className="relative flex min-h-screen items-center">
        <div className="absolute left-0 top-0 z-10 h-screen w-full bg-gradient-to-b from-transparent via-transparent to-white"></div>
        <Image
          src="/new_background.webp"
          className="absolute left-0 top-0 h-full w-full object-cover object-bottom"
          alt="Background"
          width={1200}
          height={1200}
        />
        <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center gap-6">
          <h1 className="max-w-sm text-center font-primary text-5xl text-brown sm:text-6xl 2xl:text-7xl">
            HARDIN CAFE
          </h1>
          <div className=" relative">
            <Image
              src="/coffee_cup.webp"
              alt="coffe cup"
              width={600}
              height={600}
              className="w-44 sm:w-58 2xl:w-72"
            />
            <Image
              src="/beans.webp"
              width={500}
              height={500}
              className="absolute -bottom-10 w-full scale-150 sm:scale-[1.7]"
              alt="Coffee beans"
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Hero;
