"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const QUINT_IN = [1, -0.02, 0.58, 0.94];

const LANDING_PROFILES = [
  {
    background: "/landing/3-bg.webp",
    coffee: "/landing/1-coffee.png",
    text: "Coffee, crafted in nature.",
  },
  {
    background: "/landing/3-bg.webp",
    coffee: "/landing/2-coffee.png",
    text: "Where coffee meets nature.",
  },
  {
    background: "/landing/3-bg.webp",
    coffee: "/landing/3-coffee.png",
    text: "Garden-grown vibes, coffee-crafted delights.",
  },
];

const GET_RANDOM_NUMBER = (min: number, max: number) => {
  return Math.floor(Math.random() * max) + min;
};

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollY, scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  const { scrollYProgress: zIndexScrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", `${180}vh start`],
  });

  const translateY = useTransform(scrollYProgress, [0, 0.7], [0, -50]);
  const coffee_translateY = useTransform(scrollYProgress, [0, 0.7], [0, -60]);

  const black_opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

  const zIndex = useTransform(zIndexScrollYProgress, [0, 1], [20, 0]);

  const text_animation = {
    translateY: useTransform(scrollYProgress, [0, 0.7], [0, -140]),
    opacity: useTransform(scrollYProgress, [0.1, 0.7], [1, 0]),
  };

  const [blurAmount, setBlurAmount] = useState(0);
  const [image1Loaded, setImage1Loaded] = useState(false);
  const [image2Loaded, setImage2Loaded] = useState(false);
  const [profile, setProfile] = useState<null | number>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const imageLoaded = image1Loaded && image2Loaded && profile;

  const ANIM_TRANSITION = {
    duration: 1.5,
    scale: {
      delay: 0.5,
      duration: 1.5,
      ease: QUINT_IN,
    },
    opacity: {
      delay: 0.2,
      duration: 0.3,
    },
  };

  useEffect(() => {
    const getScrollY = (value: number) => {
      if (!ref.current) return;

      const heroHeight = ref.current.offsetHeight;
      const heroStart = ref.current.offsetTop;
      const heroMiddle = heroStart + heroHeight / 3;

      const normalizedValue = Math.min(
        Math.max(((value - heroMiddle) / heroHeight) * 20, -10),
        20,
      );

      setBlurAmount(normalizedValue);
    };

    const unsubscribe = scrollY.on("change", getScrollY);

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      mouseX.set(-(clientX / window.innerHeight - 0.5) * 10);
      mouseY.set(-(clientY / window.innerWidth - 0.5) * 10);
    };

    window?.addEventListener("mousemove", handleMouseMove);

    return () => {
      window?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const profile = localStorage.getItem("landing_profile");

    let random_number = GET_RANDOM_NUMBER(1, LANDING_PROFILES.length);

    if (!profile) {
      localStorage.setItem("landing_profile", random_number.toString());
    } else {
      while (profile === random_number.toString()) {
        random_number = GET_RANDOM_NUMBER(1, LANDING_PROFILES.length);
      }
      localStorage.setItem("landing_profile", random_number.toString());
    }

    setProfile(random_number);
  }, []);
















































  return (
    <motion.div
      ref={ref}
      style={{
        zIndex,
      }}
      className="relative h-screen overflow-hidden bg-orange"
    >
      <AnimatePresence>
        {profile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <div className="relative min-h-screen w-full">
 

              <div className="fixed left-0 top-0 h-full w-full">
                <motion.div
                  animate={
                    imageLoaded
                      ? {
                          opacity: 1,
                          scale: 1.1,
                        }
                      : {}
                  }
                  initial={{
                    opacity: 0,
                    scale: 1.3,
                  }}
                  transition={ANIM_TRANSITION}
                  id="image-animate-div"
                  className="h-full"
                  style={{
                    translateY,
                    filter: `blur(${blurAmount}px)`,
                  }}
                >
                  <Image
                    alt="background_image"
                    width={1500}
                    height={1500}
                    src={LANDING_PROFILES[profile - 1]?.background ?? ""}
                    onLoad={() => setImage1Loaded(true)}
                    className="h-full w-full rotate-[2.5deg] object-cover brightness-[.80]"
                  />
                </motion.div>
                <motion.h1
                  style={{
                    ...text_animation,
                  }}
                  animate={
                    imageLoaded
                      ? {
                          opacity: 1,
                          scale: 1,
                        }
                      : {}
                  }
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  transition={{
                    duration: 1.5,
                    scale: {
                      delay: 0.5,
                      duration: 1.5,
                      ease: QUINT_IN,
                    },
                    opacity: {
                      duration: 0.3,
                    },
                  }}
                  className="text-shadow absolute left-0 right-0 top-10 mx-auto text-center font-title text-[23vw] font-black text-white sm:top-0 sm:text-[25vw]"
                >
                  HARDIN
                </motion.h1>
                <motion.div
                  animate={
                    imageLoaded
                      ? {
                          opacity: 1,
                          scale: 1,
                        }
                      : {}
                  }
                  initial={{
                    opacity: 0,
                    scale: 1.1,
                  }}
                  transition={ANIM_TRANSITION}
                  id="image-animate-div"
                  className="absolute left-0 top-0 h-full w-full"
                  style={{
                    x: springX,
                    y: springY,
                    translateY: coffee_translateY,
                    filter: `blur(${blurAmount}px)`,
                  }}
                >
                  <Image
                    width={1500}
                    height={1500}
                    alt="coffee_image"
                    onLoad={() => setImage2Loaded(true)}
                    src={LANDING_PROFILES[profile - 1]?.coffee ?? ""}
                    className="h-full w-full object-cover"
                  />
                </motion.div>

                <div className="fixed left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-transparent to-black-primary/50"></div>

                <motion.div
                  style={{
                    opacity: black_opacity,
                  }}
                  className="fixed left-0 top-0 h-full w-full bg-black-primary/30"
                ></motion.div>
              </div>

              <div className="absolute bottom-10 left-0 right-0 z-10 mx-auto flex w-full flex-col items-center  justify-center gap-4">
                <div className="flex gap-4">
                  <Button className="gap-2">
                    <p>See Menu</p>
                    <ArrowRight strokeWidth={1} className="opacity-60" />
                  </Button>
                  <Button variant={"outline"} className="group relative gap-2">
                    <p>Directions</p>
                    <MapPin strokeWidth={1} className="opacity-60" />
                  </Button>
                </div>

                <p className="font-sans text-lg font-medium text-white">
                  {LANDING_PROFILES[profile - 1]?.text ?? ""}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Hero;
