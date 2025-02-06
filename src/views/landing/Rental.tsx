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
            <h1 className="font-sans text-lg font-bold text-orange">
              Coffee Cart
            </h1>
            <h1 className="header font-primary">Mobile Coffee Cart Rental</h1>
          </div>

          <p className="sub-header">
            Make your event extra special with our Mobile Coffee Cart Rental!
            Perfect for serving 100+ guests, we provide premium coffee and
            refreshing drinks to keep everyone energized.
          </p>
          <div className="relative h-fit w-full">
            <Image
              className="absolute -right-10 pointer-events-none top-0 w-44 bottom-0 my-auto"
              alt="Tropical leave"
              src="/tropical-leave.png"
              width={300} height={300}
            />
            <Button variant="black" className="mx-auto mt-10 w-full lg:mx-0">
              Book now!
            </Button>
          </div>
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
