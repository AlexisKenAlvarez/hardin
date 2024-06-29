/* eslint-disable @next/next/no-img-element */
"use client";

import Container from "@/components/Container";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const About = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const targets: HTMLElement[] = gsap.utils.toArray(".about-containers");
    const imageTargets1: HTMLElement[] = gsap.utils.toArray(".about-images-1");
    const imageTargets2: HTMLElement[] = gsap.utils.toArray(".about-images-2");

    mm.add("(min-width: 1024px)", () => {
      const scrollTween = gsap.to(targets, {
        xPercent: -100 * (targets.length - 1),
        ease: "none", // <-- IMPORTANT!
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: 0.1,
          //snap: directionalSnap(1 / (sections.length - 1)),
          end: "+=3000",
        },
      });

      let wrapperHeight = 0;
      ScrollTrigger.normalizeScroll();
      targets.map((target) => {
        wrapperHeight += target.clientHeight;
      });

      gsap.to(wrapperRef.current, { height: wrapperHeight });

      gsap.fromTo(
        ".about-header-1",
        { y: 200 },
        {
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 50%",
            end: `+=${targets[0]!.clientHeight / 2}`,
            scrub: true,
          },
          y: 0,
        },
      );

      gsap.fromTo(
        ".about-header-2",
        { y: 200 },
        {
          scrollTrigger: {
            trigger: ".about-header-2",
            start: "start 65%",
            containerAnimation: scrollTween,
            end: `+=${targets[0]!.clientHeight / 2}`,
            scrub: true,
          },
          y: 0,
        },
      );

      gsap.fromTo(
        ".about-subheader-2",
        { y: 200 },
        {
          scrollTrigger: {
            trigger: ".about-header-2",
            start: "start 65%",
            containerAnimation: scrollTween,
            end: `+=${targets[0]!.clientHeight / 2}`,
            scrub: true,
          },
          y: 0,
        },
      );

      gsap.fromTo(
        ".location-text",
        { y: 200 },
        {
          scrollTrigger: {
            trigger: ".location-text",
            start: "start 65%",
            containerAnimation: scrollTween,
            end: `+=${targets[0]!.clientHeight / 2}`,
            scrub: true,
          },
          y: 0,
        },
      );

      imageTargets1.map((target) => {
        gsap.fromTo(
          target,
          { y: "100%", scale: 0.5, opacity: 0 },
          {
            y: "0%",
            scale: 1,
            opacity: 100,
            transformOrigin: "bottomLeft",
            scrollTrigger: {
              trigger: target,
              containerAnimation: scrollTween,
              start: "center 50%",
              end: "center+=150 25%",
              scrub: true,
            },
          },
        );
      });

      imageTargets2.map((target) => {
        gsap.fromTo(
          target,
          { y: "-100%", scale: 0.5, opacity: 0 },
          {
            y: "0%",
            scale: 1,
            opacity: 100,
            transformOrigin: "topRight",
            scrollTrigger: {
              trigger: target,
              containerAnimation: scrollTween,
              start: "center 75%",
              end: "center+=150 25%",
              scrub: true,
            },
          },
        );
      });
    });
  });

  return (
    <div
      className="relative flex flex-col justify-between overflow-hidden"
      ref={wrapperRef}
    >
      <div className="slide-container flex w-full flex-col lg:flex-row">
        <Container className="about-containers w-full p-5 py-20 pt-24 lg:h-screen lg:shrink-0">
          <div className="mx-auto w-full max-w-screen-2xl">
            <div className="w-fit space-y-2">
              <div className="text-4xl md:text-6xl lg:text-8xl">
                <div className="relative h-fit w-fit overflow-hidden">
                  <h1 className="about-header-1 max-w-3xl font-primary">
                    Selfies with your
                  </h1>
                </div>
                <div className="relative h-fit w-fit overflow-hidden">
                  <h1 className="about-header-1 max-w-3xl font-primary">
                    friends and family
                  </h1>
                </div>
              </div>

              <div className="ml-auto mr-9 w-fit">
                <div className="relative h-fit w-fit overflow-hidden">
                  <p className="about-header-1 text-right text-lg md:text-xl">
                    Awaken your senses, one sip at a time
                  </p>
                </div>
                <div className="relative h-fit w-fit overflow-hidden">
                  <button className="about-header-1 relative mt-10 flex items-center gap-2 pb-2 text-sm md:text-lg">
                    <ArrowUpRight className="inline" size={21} />
                    <h1 className="">Message us</h1>
                    <div className="absolute bottom-1 h-[1px] w-full bg-black"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 hidden w-full grid-cols-4 items-end justify-end gap-10 px-14 lg:grid">
            {Array.from({ length: 4 }).map((_, index) => (
              <img
                key={index}
                alt={`about${index}`}
                src={`/about/first/${index + 1}.webp`}
                className="about-images-1 w-full"
              />
            ))}
          </div>
        </Container>

        <Container className="about-containers flex h-auto w-full items-end py-20  lg:h-screen lg:shrink-0 lg:py-0">
          <div className="mx-auto flex w-full max-w-screen-2xl sm:justify-end lg:pb-24">
            <div className="w-fit space-y-2">
              <div className="text-4xl md:text-6xl lg:text-8xl">
                <div className="relative h-fit w-fit overflow-hidden">
                  <h1 className="about-header-2 max-w-4xl font-primary">
                    Outdoor dining has
                  </h1>
                </div>
                <div className="relative h-fit w-fit overflow-hidden pb-2">
                  <h1 className="about-header-2 max-w-4xl font-primary">
                    never been so good
                  </h1>
                </div>
              </div>

              <div className="ml-auto mr-9 h-fit w-fit overflow-hidden">
                <p className="about-subheader-2 text-lg sm:text-right md:text-xl">
                  Let the great outdoors do all the talking
                </p>
              </div>
            </div>
          </div>

          <div className="absolute left-0 top-0 hidden w-full grid-cols-4 items-start justify-center gap-10 px-10 pr-44 lg:grid">
            {Array.from({ length: 4 }).map((_, index) => (
              <img
                key={index}
                alt={`about${index}`}
                src={`/about/second/${index + 1}.webp`}
                className="about-images-2 w-full origin-top"
              />
            ))}
          </div>
        </Container>

        <Container className="about-containers flex h-auto w-full flex-col py-20 lg:h-screen lg:shrink-0 lg:py-0">
          <div className="mt-28 flex w-full flex-1 flex-col">
            <div className="relative w-full overflow-hidden">
              <h1 className="location-text text-center font-primary text-4xl font-medium md:text-5xl lg:text-7xl">
                Where are we located?
              </h1>
            </div>

            <div className="mx-auto mr-9 h-fit w-full overflow-hidden">
              <p className="location-text text-center text-lg md:text-xl ">
                Our location
              </p>
            </div>

            <div className="relative flex flex-1 flex-col">
              <div className="md:block hidden absolute z-10 bg-white p-5 rounded-md top-0 bottom-0 my-auto h-fit left-20">
                We are located beside taal fire department
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242.08451034053456!2d120.91763876686716!3d13.877878802438001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd0b003b0ff2c9%3A0x6f813e24850eed57!2sHardin%20Caf%C3%A9!5e0!3m2!1sen!2sph!4v1710055487885!5m2!1sen!2sph"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="mt-8 h-full w-full flex-1 "
              ></iframe>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default About;
