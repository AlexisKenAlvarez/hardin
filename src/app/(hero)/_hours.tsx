"use client";

import BotTop from "@/anim/BotTop";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

const Hours2 = ({ formattedUrl }: { formattedUrl: string }) => {
  return (
    <div
      className="relative flex w-full items-center overflow-hidden bg-white py-20"
      id="hours"
    >
      <Image
        alt="Sketch"
        width={500}
        height={500}
        src="/sketch.png"
        className="absolute right-0 hidden h-full translate-x-1/4 lg:block "
      />
      <Container className="mx-auto flex w-full flex-col-reverse items-center justify-center gap-10 lg:flex-row lg:gap-20">
        <div className=" w-full">
          <Image
            alt="Hours"
            width={1200}
            height={1200}
            src={formattedUrl}
            className="mx-auto sm:mx-0 max-w-[30rem] sm:w-auto w-[80vw]"
          />
        </div>
        <div className="w-full space-y-2 text-center lg:text-left">
          <BotTop>
            <p className="font-secondary text-lg font-bold text-orange">
              OPEN HOURS
            </p>
          </BotTop>
          <BotTop>
            <h1 className="header mx-auto max-w-md lg:mx-0">
              Join us at your convenience
            </h1>
          </BotTop>
          <BotTop>
            <div className="sub-header mx-auto max-w-xl">
              <p>
                We are open everyday! Come by and have a cup of coffee with us.
                We are located at{" "}
                <Link
                  href="https://maps.app.goo.gl/ETzQCiE9RUgGT932A"
                  target="_blank"
                  className="font-bold underline"
                >
                  📌Taal Batangas
                </Link>
                , beside Taal fire station.
              </p>
            </div>
          </BotTop>
        </div>
      </Container>
    </div>
  );
};

export default Hours2;
