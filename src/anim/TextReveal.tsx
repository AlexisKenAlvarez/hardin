"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import type { ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TextReveal = ({ children }: { children: ReactNode }) => {
  gsap.registerPlugin(ScrollTrigger);
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      textRef.current,
      {
        y: "100%",
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "bottom 50%",
          scrub: 2,
        },
      },
    );
  }, [{ scope: ref.current }]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <div className="opacity-0" ref={textRef}>
        {children}
      </div>
    </div>
  );
};

export default TextReveal;
