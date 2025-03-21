"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const BrewingSince = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -500]);
  return (
    <motion.div
      ref={ref}
      whileInView={{
        zIndex: 12,
      }}
      className="relative bg-white"
    >
      <div className="absolute top-0 z-10 h-20 w-full bg-[url(/overlay.png)] bg-repeat-x brightness-200"></div>
      <div className="absolute bottom-0 z-10 h-20 w-full rotate-180 bg-[url(/overlay.png)] bg-repeat-x brightness-200"></div>
      <motion.div
        style={{
          translateY,
        }}
        className="fixed left-0 top-64 "
      >
        <video
          width="320"
          height="240"
          preload="none"
          autoPlay
          loop
          muted
          playsInline
          className="h-screen w-full object-cover opacity-90 brightness-75"
        >
          <source src="/circle.mp4" type="video/mp4" />
          <track
            src="/path/to/captions.vtt"
            kind="subtitles"
            srcLang="en"
            label="English"
          />
          Your browser does not support the video tag.
        </video>
      </motion.div>
      <div className="h-[50vh] w-full relative z-10 text-white flex items-center justify-center flex-col gap-2 text-center px-4">
        <h1 className="header">A little warmth in every cup</h1>
        <p className="sub-header text-white opacity-80">
          Sharing cozy moments and good coffee since <b>2023.</b>
        </p>
      </div>
    </motion.div>
  );
};

export default BrewingSince;
