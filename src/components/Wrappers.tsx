"use client";

import React, { Suspense, useEffect } from "react";
import type { ReactNode } from "react";

const Wrappers = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    void(async() => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default

      new LocomotiveScroll();
    })()
  }, []);
  return <Suspense fallback={<>Loading..</>}>{children}</Suspense>;
};

export default Wrappers;
