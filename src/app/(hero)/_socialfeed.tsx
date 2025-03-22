"use client";

import BotTop from "@/anim/BotTop";
import { SOCIALS } from "@/components/Nav";
import { cn } from "@/lib/utils";
import Image from "next/image";
const SocialFeed = () => {
  return (
    <div className="relative min-h-screen bg-white py-20">
      <div className="absolute bottom-0 z-10 h-20 w-full translate-y-full bg-[url(/overlay.png)] bg-repeat-x "></div>

      <div className="mx-auto max-w-screen-lg px-4">
        <div className="space-y-2 text-center">
          <BotTop>
            <p className="font-sans text-lg font-bold text-orange">
              STAY UPDATED
            </p>
          </BotTop>
          <BotTop>
            <h1 className="header mx-auto">SOCIAL FEED</h1>
          </BotTop>
          <BotTop>
            <p className="sub-header mx-auto max-w-xl">
              Follow us on social to get real-time updates and stories about us.
            </p>
          </BotTop>
        </div>

        <BotTop>
          <ul
            className={cn("flex w-full items-center justify-center gap-4")}
          >
            {SOCIALS.map((item, index) => (
              <a
                href={`${item.url}`}
                rel="noopener noreferrer"
                target="_blank"
                key={index}
              >
                <li
                  className={cn(
                    "flex items-center  rounded-full py-2 text-black",
                  )}
                >
                  <item.icon className="text-xl lg:text-base" size={34} />
                </li>
              </a>
            ))}
          </ul>
        </BotTop>
        <BotTop>
          <p className="text-center font-sans font-medium">@hardincafe</p>
        </BotTop>

        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[...Array.from({ length: 6 })].map((_, index) => (
            <li key={`feed-${index}`}>
              <Image
                src={`/social_feed/${index + 1}.webp`}
                alt={`social-feed-${index}`}
                width={800}
                height={800}
                className="transform transition-all duration-300 ease-in-out hover:scale-105"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SocialFeed;
