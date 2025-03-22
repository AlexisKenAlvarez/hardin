import { AiFillInstagram } from "react-icons/ai";
import { FaEnvelope, FaFacebook } from "react-icons/fa";

import Link from "next/link";

const FOOTER_SOCIALS = [
  {
    label: "Email",
    icon: FaEnvelope,
    url: "mailto:hardincafe@gmail.com",
  },
  {
    label: "Facebook",
    icon: FaFacebook,
    url: "https://www.facebook.com/profile.php?id=61553926187351",
  },
  {
    label: "Instagram",
    icon: AiFillInstagram,
    url: "https://www.instagram.com/hardincafe",
  },
];

const Footer = () => {
  const CURRENT_YEAR = new Date().getFullYear();

  return (
    <div className="relative z-10 min-h-[25rem] bg-[#B67E30] w-full font-sans text-white md:min-h-[30rem]">
      <div className="fixed bottom-0 left-0 h-[25rem] w-full overflow-hidden  bg-gradient-to-b from-[#B67E30] to-[#815921] p-10 pt-14 md:h-[30rem]">
        <div className="mx-auto max-w-screen-lg space-y-4 md:space-y-0">
          <div className="flex flex-col-reverse items-center justify-center gap-3 lg:flex-row lg:justify-between lg:gap-10">
            <div className="gap-6 lg:w-1/2">
              <p className="text-center text-sm md:text-base lg:text-left">
                A hidden gem where coffee and nature intertwine, creating the
                perfect blend of peace and flavor.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              {FOOTER_SOCIALS.map((items) => (
                <a
                  href={items.url}
                  key={items.label}
                  className="grid h-8 w-8 place-content-center rounded-full border border-white transition-all duration-300 hover:bg-white hover:text-[#B67E30]"
                >
                  <items.icon />
                </a>
              ))}
            </div>
          </div>
          <div className="">
            <h1 className="clamped-text-footer mt-6 text-center font-primary leading-none lg:text-[17rem]">
              HARDIN
            </h1>
          </div>
          <div className="flex flex-col justify-between gap-3 text-center text-sm md:text-base lg:flex-row lg:gap-10 lg:text-left">
            <h1 className="">
              <span className="font-bold">@ Hardin Cafe</span> | All Rights
              Reserved {CURRENT_YEAR}
            </h1>

            <Link href="https://www.alexisalvarez.com" target="_blank">
              <p>www.alexisalvarez.com</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
