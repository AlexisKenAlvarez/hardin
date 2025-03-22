"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "motion/react";

const JumpToTop = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {scrollPosition > 100 && (
        <motion.div
          initial={{
            y: 50,
            opacity: 0,
            rotate: -180,
          }}
          animate={{
            y: 0,
            opacity: 1,
            rotate: 0,
          }}
          exit={{
            y: 50,
            opacity: 0,
            rotate: -180,
          }}
          transition={{
            duration: 0.6,
          }}
          className="fixed bottom-5 right-5 z-50"
        >
          <Button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            size={"icon"}
            variant={"outline"}
            className=" border-black/20 bg-white/20 hover:bg-white"
          >
            <svg
              className="-rotate-90 scale-[1.4] opacity-30"
              id="arrow down"
              width="25"
              height="36"
              viewBox="0 0 18 36"
              fill="black"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.67798 9.86986L5.26948 8.27987L13.938 16.9454C14.0777 17.0842 14.1886 17.2493 14.2643 17.4312C14.3399 17.6131 14.3789 17.8081 14.3789 18.0051C14.3789 18.2021 14.3399 18.3971 14.2643 18.579C14.1886 18.7609 14.0777 18.926 13.938 19.0649L5.26948 27.7349L3.67948 26.1449L11.8155 18.0074L3.67798 9.86986Z"
                fill="black"
              />
            </svg>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JumpToTop;
