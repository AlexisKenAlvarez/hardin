"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useTheme } from "next-themes";
import { useRef } from "react";

const BrewingSince = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

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
      <div className="absolute top-0 z-10 h-20 w-full bg-[url(/overlay.png)] bg-repeat-x "></div>
      <div className="absolute bottom-0 z-10 h-20 w-full rotate-180 bg-[url(/overlay.png)] bg-repeat-x "></div>
      <motion.div
        style={{
          translateY,
        }}
        className="fixed left-0 right-0 top-64"
      >
        <video
          preload="none"
          key={theme}
          autoPlay
          loop
          muted
          playsInline
          className="h-screen w-full object-cover opacity-90 brightness-75"
        >
          <source
            src={theme === "light" ? "/circle.mp4" : "/circle_green.mp4"}
            type="video/mp4"
          />
          <track
            src="/path/to/captions.vtt"
            kind="subtitles"
            srcLang="en"
            label="English"
          />
          Your browser does not support the video tag.
        </video>
      </motion.div>
      <div className="relative z-10 flex h-[50vh] w-full flex-col items-center justify-center gap-2 px-4 text-center text-white">
        <h1 className="header">A little warmth in every cup</h1>
        <p className="sub-header text-white opacity-80">
          Sharing cozy moments and good coffee since <b>2023.</b>
        </p>
      </div>
    </motion.div>
  );
};

export default BrewingSince;
