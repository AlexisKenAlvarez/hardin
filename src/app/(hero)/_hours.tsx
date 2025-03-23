"use client";

import BotTop from "@/anim/BotTop";
import Image from "next/image";
import Link from "next/link";

const Hours2 = ({ formattedUrl }: { formattedUrl: string }) => {
  return (
    <div className="relative flex w-full items-center overflow-hidden bg-white px-10 py-20" id="hours">
      <Image
        alt="Sketch"
        width={500}
        height={500}
        src="/sketch.png"
        className="absolute right-0 hidden h-full translate-x-1/4 lg:block "
      />
      <div className="mx-auto flex w-full max-w-screen-lg flex-col-reverse items-center justify-center gap-10 lg:flex-row">
        <div className=" w-full">
          <Image
            alt="Hours"
            width="500"
            height="500"
            src={formattedUrl}
            className="mx-auto block w-96"
          />
        </div>
        <div className="w-full space-y-2 text-center lg:text-left">
          <BotTop>
            <p className="font-sans text-lg font-bold text-orange">
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
      </div>
    </div>
  );
};

export default Hours2;
