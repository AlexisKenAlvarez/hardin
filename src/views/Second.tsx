"use client";

import TextReveal from "@/anim/TextReveal";
import Container from "@/components/Container";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

const Second = () => {
  const videoContainerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.fromTo(
      ".second-video",
      {
        clipPath: "inset(25% round 25px)",
      },
      {
        clipPath: "inset(0% round 25px)",
        scrollTrigger: {
          trigger: videoContainerRef.current,
          start: "top 15%",
          end: "bottom 40%",
          pin: true,
          scrub: 1,
        },
      },
    );
  });

  const phrases = [
    "Step into Hardin Cafe, where the charm of a garden meets the warmth of a",
    "coffeehouse. Amidst verdant foliage, indulge in handcrafted brews and",
    "treats while basking in the serene ambiance. Whether seeking solace or",
    "camaraderie, our garden welcomes you to savor each moment.",
  ];

  return (
    <Container className="min-h-screen space-y-44 pb-20">
      <div className="mx-auto w-full max-w-screen-2xl pt-32">
        <h1 className="mx-auto max-w-6xl text-center text-xl font-medium !leading-relaxed sm:text-2xl md:text-3xl lg:text-4xl">
          {phrases.map((phrase, index) => (
            <TextReveal key={index}>
              <span className="">{phrase}</span>
            </TextReveal>
          ))}
        </h1>
      </div>

      <div className="w-ful mx-auto max-w-screen-2xl" ref={videoContainerRef}>
        <video
          className="second-video h-[80vh] w-full object-cover"
          style={{ clipPath: "inset(25% round 25px)" }}
          autoPlay
          preload="none"
          loop
          muted
          playsInline
        >
          <source
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/coffee_video.mp4`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </Container>
  );
};

export default Second;
