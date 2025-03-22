"use client";

import Nav from "@/components/Nav";
import CustomButton from "@/components/ui/CustomButton";
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
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";

const QUINT_IN = [1, -0.02, 0.58, 0.94];

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const matches = useMediaQuery("(min-width: 640px)");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  const { scrollYProgress: zIndexScrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", `${180}vh start`],
  });

  const translateY = useTransform(scrollYProgress, [0, 0.7], [0, -50]);
  const coffee_translateY = useTransform(scrollYProgress, [0, 0.7], [0, -60]);
  const zIndex = useTransform(zIndexScrollYProgress, [0, 1.5], [20, 0]);

  const text_animation = {
    translateY: useTransform(scrollYProgress, [0, 0.7], [0, -140]),
    opacity: useTransform(scrollYProgress, [0, 0.7], [1, 0]),
  };

  const [image1Loaded, setImage1Loaded] = useState(false);
  const [image2Loaded, setImage2Loaded] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const imageLoaded = image1Loaded && image2Loaded;

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
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      mouseX.set(-(clientX / window.innerHeight - 0.5) * 10);
      mouseY.set(-(clientY / window.innerWidth - 0.5) * 10);
    };

    if (matches) {
      window?.addEventListener("mousemove", handleMouseMove);
    } else {
      window?.removeEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [matches]);

  return (
    <motion.div
      ref={ref}
      style={{
        zIndex,
      }}
      className="relative h-screen overflow-hidden bg-coffee-light font-sans"
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative"
        >
          <div className="relative min-h-screen w-full">
            <div className="from-coffee-light to-coffee-dark fixed left-0 top-0 h-full w-full  bg-gradient-to-b sm:bg-coffee-light">
              <Nav />

              {matches && (
                <>
                  <div className="absolute left-0 top-0 h-screen w-44 bg-coffee-dark blur-[10rem]" />
                  <div className="absolute right-0 top-0 h-screen w-44 bg-coffee-dark blur-[10rem]" />
                  <div className="absolute top-0  h-44 w-full bg-coffee-dark blur-[10rem]" />
                  <div className="absolute bottom-0  h-44 w-full bg-coffee-dark blur-[10rem]" />
                  <div className="absolute left-0 top-0 h-full w-full bg-[url(/noise.png)] bg-repeat" />
                </>
              )}
              <div className="absolute bottom-3 left-0 right-0 mx-auto flex w-fit flex-col items-center justify-center">
                <h1 className="text-white">Learn More</h1>
                <motion.div
                  animate={{ y: [0, -10, 0], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative flex cursor-pointer items-center justify-center space-x-2"
                >
                  <svg
                    className="rotate-90"
                    id="arrow down"
                    width="18"
                    height="36"
                    viewBox="0 0 18 36"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.67798 9.86986L5.26948 8.27987L13.938 16.9454C14.0777 17.0842 14.1886 17.2493 14.2643 17.4312C14.3399 17.6131 14.3789 17.8081 14.3789 18.0051C14.3789 18.2021 14.3399 18.3971 14.2643 18.579C14.1886 18.7609 14.0777 18.926 13.938 19.0649L5.26948 27.7349L3.67948 26.1449L11.8155 18.0074L3.67798 9.86986Z"
                      fill="white"
                    />
                  </svg>
                </motion.div>
              </div>

              <motion.div
                animate={
                  imageLoaded && matches
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
                style={
                  matches
                    ? {
                        translateY,
                      }
                    : {}
                }
              >
                <Image
                  alt="background_image"
                  width={1500}
                  height={1500}
                  src={"/hero/elements.png"}
                  onLoad={() => setImage1Loaded(true)}
                  className="absolute bottom-0 left-0 right-0 top-0 z-20 m-auto w-[100vh] object-cover"
                />
              </motion.div>

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
                className="absolute left-0 top-0 flex h-full w-full items-center justify-center"
                style={
                  !matches
                    ? {}
                    : {
                        x: springX,
                        y: springY,
                        translateY: coffee_translateY,
                      }
                }
              >
                <Image
                  width={1500}
                  height={1500}
                  alt="coffee_image"
                  onLoad={() => setImage2Loaded(true)}
                  src={"/landing/1-coffee.png"}
                  className="h-[90%] w-full object-cover brightness-75 sm:h-full"
                />
              </motion.div>

              <motion.div
                style={
                  matches
                    ? {
                        ...text_animation,
                      }
                    : {}
                }
                className="absolute bottom-0 left-0 right-0 top-0 z-10 m-auto h-fit w-fit"
              >
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
                  className="h-fit text-center font-secondary text-4xl leading-tight tracking-widest text-white sm:top-0 sm:z-0 sm:text-[5rem]"
                >
                  HARDIN CAFE
                </motion.h1>
                {/* Generate a quote for coffee shop hero section below */}
                <p className="px-4 text-center text-white sm:px-0">
                  Good coffee is a pleasure. Good friends are a treasure.
                </p>
                <div className="mt-4 flex w-full flex-col items-center justify-center space-y-2">
                  <CustomButton asChild>
                    <Link href={"/menu"}>View Our Menu</Link>
                  </CustomButton>
                  <CustomButton variant="outline">Visit Facebook</CustomButton>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Hero;
