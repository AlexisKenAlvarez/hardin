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
    <div className="relative z-10 min-h-[25rem] md:min-h-[30rem] w-full font-sans text-white">
      <div className="fixed bottom-0 left-0 h-[25rem] md:h-[30rem] w-full  overflow-hidden bg-gradient-to-b from-[#B67E30] to-[#815921] p-10 pt-14">
        <div className="max-w-screen-lg mx-auto md:space-y-0 space-y-4">
          <div className="flex gap-3 lg:gap-10 justify-center items-center lg:justify-between lg:flex-row flex-col-reverse">
            <div className="gap-6 lg:w-1/2">
              <p className="text-center lg:text-left md:text-base text-sm">
                A hidden gem where coffee and nature intertwine, creating the
                perfect blend of peace and flavor.
              </p>
            </div>
            <div className="gap-3 flex justify-end">
              {FOOTER_SOCIALS.map((items) => (
                <a href={items.url} key={items.label} className="hover:bg-white hover:text-[#B67E30] transition-all duration-300 rounded-full border border-white h-8 w-8 grid place-content-center">
                  <items.icon />
                </a>
              ))}
            </div>
          </div>
          <div className="">
            <h1 className="font-primary lg:text-[17rem] clamped-text-footer text-center leading-none mt-6">HARDIN</h1>
          </div>
          <div className="flex md:text-base text-sm justify-between text-center lg:text-left gap-3 lg:gap-10 lg:flex-row flex-col">
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
