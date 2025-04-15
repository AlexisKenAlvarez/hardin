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
import Container from "@/components/Container";

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

      <Container className="z-10 flex flex-col items-center justify-center gap-10 lg:flex-row  lg:gap-20">
        <div className="w-full text-center lg:text-left">
          <div className="space-y-2">
            <BotTop>
              <h1 className="font-secondary text-lg font-bold uppercase text-orange">
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
          <BotTop>
            <CustomButton className="mx-auto mt-10 w-fit lg:mx-0" asChild>
              <Link
                href={"/cart"}
                className="block"
              >
                View All Package
              </Link>
            </CustomButton>
          </BotTop>
        </div>
        <div className="flex  flex-col items-center justify-center md:mx-0 md:w-full ">
          <Image
            alt="Rental"
            width={1200}
            height={1200}
            src="/rental/cart.jpg"
            className="w-[80vw]  max-w-[30rem] sm:w-auto"
          />
        </div>
      </Container>
    </div>
  );
};
``;

export default Rental;
