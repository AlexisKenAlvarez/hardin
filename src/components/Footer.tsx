import Image from "next/image";

const Footer = () => {
  return (
    <div className="relative z-10 min-h-[30rem] w-full bg-[#242424]">
      <div className="absolute  top-0 min-h-[10rem] w-full -translate-y-full bg-[#242424]"></div>
      <div className="fixed bottom-0 left-0 h-[30rem] w-full  overflow-hidden bg-gradient-to-b from-[#242424] to-[#0e0e0e]">


        <h1 className="absolute -left-5 bottom-0 right-0 mx-auto w-fit translate-y-24 text-nowrap text-center font-sans text-[14vw] font-bold text-white">
          HARDIN
        </h1>
      </div>
    </div>
  );
};

export default Footer;
