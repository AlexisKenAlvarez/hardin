"use client";

import { motion } from "framer-motion";
import type { FunctionComponent, JSX } from "react";
import { useInView } from "react-intersection-observer";

interface Children {
  children: JSX.Element;
  delay?: number;
}

const LeftRight: FunctionComponent<Children> = ({ children, delay = 0.2 }) => {
  const options = {
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: `${window.innerHeight}px 0px  0px 0px`,
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const [ref, inView] = useInView(options);

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <div className="" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 0.77, 0.47, 0.97], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default LeftRight;
