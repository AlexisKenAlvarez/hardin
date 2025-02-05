"use client";

import Button from "@/components/ui/button";
import Image from "next/image";

const Rental = () => {
  return (
    <div className="relative flex  w-full items-center justify-center bg-[#FFF3E2] px-10 py-28">
      <div className="absolute left-0 top-0 h-full w-full  bg-[url(/rental_noise.webp)] opacity-30"></div>
      <div className="z-10 mx-auto flex max-w-screen-lg flex-col items-center justify-center gap-14 lg:flex-row">
        <div className="w-full px-10 pt-10 text-center lg:text-left">
          <div className="space-y-2">
            <h1 className="font-sans text-lg font-bold text-primary">
              Coffee Cart
            </h1>
            <h1 className="header font-primary">Mobile Coffee Cart Rental</h1>
          </div>

          <p className="sub-header">
            Make your event extra special with our Mobile Coffee Cart Rental!
            Perfect for serving 100+ guests, we provide premium coffee and
            refreshing drinks to keep everyone energized.
          </p>
          <Button variant="black" className="mx-auto lg:mx-0 mt-10">Book now!</Button>
        </div>
        <div className="flex w-full items-center justify-center md:mx-0">
          <Image
            alt="Rental"
            width={800}
            height={800}
            src="/rental.webp"
            className="w-72 max-w-96 sm:w-auto lg:max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Rental;
