"use client";

import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const QUINT_IN = [1, -0.02, 0.58, 0.94];

const LANDING_PROFILES = [
  {
    background: "/landing/1-bg.webp",
    coffee: "/landing/1-coffee.png",
    text: "Coffee, crafted in nature.",
  },
  {
    background: "/landing/2-bg.webp",
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
  const [image1Loaded, setImage1Loaded] = useState(false);
  const [image2Loaded, setImage2Loaded] = useState(false);
  const [profile, setProfile] = useState<null | number>(null);


  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bgMouseX = useMotionValue(0);
  const bgMouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const bgSpringX = useSpring(bgMouseX, { stiffness: 50, damping: 20 });
  const bgSpringY = useSpring(bgMouseY, { stiffness: 50, damping: 20 });

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

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      mouseX.set(-(clientX / window.innerHeight - 0.5) * 20);
      mouseY.set(-(clientY / window.innerWidth - 0.5) * 20);

      bgMouseX.set(-(clientX / window.innerHeight - 0.5) * 10);
      bgMouseY.set(-(clientY / window.innerWidth - 0.5) * 10);
    };

    window?.addEventListener("mousemove", handleMouseMove);


    return () => {
      window?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen  bg-orange">
      <AnimatePresence>
        {profile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <Nav />
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
                    x: bgSpringX,
                    y: bgSpringY,
                  }}
                >
                  <Image
                    alt="background_image"
                    width={1500}
                    height={1500}
                    src={LANDING_PROFILES[profile - 1]?.background ?? ""}
                    onLoad={() => setImage1Loaded(true)}
                    className="h-full w-full object-cover brightness-[.80]"
                  />
                </motion.div>
                <motion.h1
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
                  className="text-shadow absolute left-0 top-0 font-title text-[25vw] font-black text-white"
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

                <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
              </div>

              <div className="absolute bottom-10 left-0 right-0 z-10 mx-auto flex w-full flex-col items-center  justify-center gap-4">
                <div className="flex gap-4">
                  <Button className="gap-2">
                    <p>See Menu</p>
                    <ArrowRight strokeWidth={1} className="opacity-60" />
                  </Button>
                  <Button variant={"outline"} className="gap-2">
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
    </div>
  );
};

export default Hero;
