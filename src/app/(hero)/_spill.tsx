"use client";

import BotTop from "@/anim/BotTop";
import Image from "next/image";
import { useRef } from "react";

const Spill = () => {
  const ref = useRef<HTMLDivElement>(null);

  const traits = [
    {
      title: "Signature Recipes",
      desc: "We craft unique coffee blends with our very own special recipes.",
    },
    {
      title: "Premium Quality Coffee",
      desc: "A premium quality coffee is what our customers deserve.",
    },
    {
      title: "Best Coffee in Town",
      desc: "We have the best coffee in town!",
    },
    {
      title: "Peaceful and Cozy Ambience",
      desc: "Enjoy a calm, cozy atmosphere perfect for relaxing or working.",
    },
  ];

  return (
    <div className="relative mt-4 bg-white py-10 md:py-20" ref={ref} id="about">
      <div className="absolute top-0 z-10 h-20 w-full -translate-y-full rotate-180 bg-[url(/overlay.png)] bg-repeat-x "></div>

      <div className="absolute bottom-0 left-0 right-0 top-0 m-auto h-32 w-full bg-coffee-light opacity-50 blur-[13rem]" />
      <Image
        src="/spill/left.png"
        alt="Left"
        width={1000}
        height={1000}
        className="absolute bottom-0 left-0 top-0 my-auto w-96 opacity-30"
      />
      <Image
        src="/spill/right.png"
        alt="Right"
        width={1000}
        height={1000}
        className="absolute bottom-0 right-0 top-10 my-auto w-80 opacity-30"
      />
      <div className="mx-auto max-w-screen-lg">
        <div className="space-y-2 text-center">
          <p className="font-sans text-lg font-bold text-orange">
            JUST FOR YOU
          </p>
          <h1 className="header mx-auto">SPECIAL COFFEE</h1>
          <p className="sub-header mx-auto max-w-xl">
            Premium blend with affordable price. Enjoy our special coffee with
            your friends and family.
          </p>
        </div>
        <div className="mt-10 flex flex-row items-start justify-center px-10">
          <div className="mt-14 hidden space-y-20 md:block">
            {traits.slice(0, 2).map((trait, index) => (
              <div className="space-y-2" key={index}>
                <BotTop>
                  <>
                    <h1 className="font-primary text-2xl font-bold text-orange">
                      {trait.title}
                    </h1>
                    <p className="sub-header text-sm">{trait.desc}</p>
                  </>
                </BotTop>
              </div>
            ))}
          </div>
          <Image
            alt="spill"
            src="/spill/coffee_spill.png"
            className="w-[30rem]"
            width={1000}
            height={1000}
          />
          <div className="mt-14 hidden space-y-20 text-right md:block">
            {traits.slice(2, 4).map((trait, index) => (
              <div className="space-y-2" key={index}>
                <BotTop>
                  <>
                    <h1 className="font-primary text-2xl font-bold text-orange">
                      {trait.title}
                    </h1>
                    <p className="sub-header text-sm">{trait.desc}</p>
                  </>
                </BotTop>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spill;
