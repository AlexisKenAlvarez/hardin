"use client";

import Button from "@/components/ui/button";
import Image from "next/image";

const Rental = () => {
  return (
    <div className="flex w-full  items-center justify-center bg-[#DFE5E5] px-10 py-28 relative">
      <div className="absolute left-0 top-0 h-full w-full  bg-[url(/rental_noise.webp)] opacity-50"></div>
      <div className="mx-auto flex max-w-screen-lg items-center lg:flex-row flex-col justify-center gap-14 z-10">
        <div className="w-full space-y-4 pt-10 text-center lg:text-left px-10">
          <h1 className="header">Mobile Coffee Cart Rental</h1>
          <p className="sub-header">
            Make your event extra special with our Mobile Coffee Cart Rental!
            Perfect for serving 100+ guests, we provide premium coffee and
            refreshing drinks to keep everyone energized. Whether it&apos;s a
            wedding with full coordination on the day or any other celebration,
            we offer expert event planning and coordination to ensure everything
            runs smoothly. Elevate your event with our stylish and convenient
            coffee and refresher cart—because great moments deserve great
            drinks! ☕✨
          </p>
          <Button className="mx-auto lg:mx-0">Book now!</Button>
        </div>
        <div className="w-full flex items-center justify-center md:mx-0">
          <Image alt="Rental" width={800} height={800} src="/rental.webp" className="max-w-96 lg:max-w-full sm:w-auto w-72" />
        </div>
      </div>
    </div>
  );
};

export default Rental;
