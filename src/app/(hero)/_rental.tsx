"use client";

import CustomButton from "@/components/ui/CustomButton";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  ResponsiveContainer,
  StackedCarousel,
} from "react-stacked-center-carousel";

import { cn } from "@/lib/utils";
import Package1 from "../../../public/rental/1.jpg";
import Package2 from "../../../public/rental/2.jpg";
import Package3 from "../../../public/rental/3.jpg";
import Package4 from "../../../public/rental/4.jpg";
import Package5 from "../../../public/rental/5.jpg";
import Package6 from "../../../public/rental/6.jpg";
import Package7 from "../../../public/rental/7.jpg";
import Package8 from "../../../public/rental/8.jpg";
import { useMediaQuery } from "usehooks-ts";
import BotTop from "@/anim/BotTop";
import Link from "next/link";

export const rental_data = [
  {
    cover: Package1,
    title: "Interstaller",
  },
  {
    cover: Package2,
    title: "Inception",
  },
  {
    cover: Package3,
    title: "Blade Runner 2049",
  },
  {
    cover: Package4,
    title: "Icon man 3",
  },
  {
    cover: Package5,
    title: "Venom",
  },
  {
    cover: Package6,
    title: "Steins Gate",
  },
  {
    cover: Package7,
    title: "One Punch Man",
  },
  {
    cover: Package8,
    title: "A Silent Voice",
  },
];

interface RentalType {
  cover: string;
  title: string;
}

interface CardProps {
  data: RentalType[];
  dataIndex: number;
}

const Rental = () => {
  const ref = useRef<StackedCarousel>(undefined);
  const [centerSlideDataIndex, setCenterSlideDataIndex] = React.useState(0);
  const matches = useMediaQuery("(max-width: 500px)");
  const onCenterSlideDataIndexChange = (newIndex: number) => {
    play_carousel();
    setCenterSlideDataIndex(newIndex);
  };

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const play_carousel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      ref.current?.goNext();
    }, 3000);

    setTimeoutId(id);
  };

  useEffect(() => {
    play_carousel();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex  w-full items-center justify-center bg-[#FFF3E2] px-10 py-16 !pb-24 sm:py-20">
      <div className="absolute top-0 z-10 h-20 w-full bg-[url(/overlay.png)] bg-repeat-x "></div>
      <div className="absolute bottom-0 z-10 h-20 w-full rotate-180 bg-[url(/overlay.png)] bg-repeat-x "></div>

      <div className="absolute left-0 top-0 h-full w-full  bg-[url(/rental_noise.webp)] opacity-30"></div>
      <div className="items- z-10 mx-auto flex max-w-screen-lg flex-col items-center justify-center gap-20 md:gap-14 lg:flex-row">
        <div className="w-full px-10 text-center lg:text-left">
          <div className="space-y-2">
            <BotTop>
              <h1 className="font-sans text-lg font-bold uppercase text-orange">
                Coffee Cart
              </h1>
            </BotTop>
            <BotTop>
              <h1 className="header font-primary">Mobile Coffee Cart Rental</h1>
            </BotTop>
          </div>

          <BotTop>
            <p className="sub-header mt-4">
              Make your event extra special with our Mobile Coffee Cart Rental!
              Perfect for serving 100+ guests, we provide premium coffee and
              refreshing drinks to keep everyone energized.
            </p>
          </BotTop>
          <div className="relative h-fit w-full">
            <BotTop>
              <CustomButton className="mx-auto mt-10 lg:mx-0 lg:w-full " asChild>
                <Link href={'https://www.facebook.com/profile.php?id=61553926187351'} target="_blank">Message Us</Link>
              </CustomButton>
            </BotTop>
          </div>
        </div>
        <div className="flex w-[22rem] flex-col items-center justify-center sm:w-[34rem] md:mx-0 md:w-full ">
          <ResponsiveContainer
            carouselRef={ref}
            render={(parentWidth, carouselRef) => {
              let maxVisibleSlide = 5;
              if (matches) {
                maxVisibleSlide = 1;
              }
              return (
                <StackedCarousel
                  ref={carouselRef}
                  slideComponent={Card}
                  slideWidth={350}
                  carouselWidth={parentWidth}
                  data={rental_data}
                  maxVisibleSlide={maxVisibleSlide}
                  useGrabCursor
                  onActiveSlideChange={onCenterSlideDataIndexChange}
                />
              );
            }}
          />
          <ul className="mt-4 flex items-center gap-1">
            {[...Array.from({ length: 8 })].map((_, index) => (
              <li
                className={cn(
                  "h-1 w-2 shrink-0 rounded-full bg-black/10 transition-all duration-300 ease-in-out",
                  {
                    "h-1 w-6 bg-black/40": index === centerSlideDataIndex,
                  },
                )}
                key={index}
              ></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
``;

export default Rental;

const Card = React.memo(function (props: CardProps) {
  const { data, dataIndex } = props;
  const { cover } = data[dataIndex]!;
  return (
    <Image
      style={{
        objectFit: "cover",
        borderRadius: 0,
      }}
      draggable={false}
      src={cover}
      className="w-[25rem] lg:h-[20rem]"
      alt=""
    />
  );
});

Card.displayName = "Card";
