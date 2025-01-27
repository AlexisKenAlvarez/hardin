import About from "@/views/landing/About";
import Hero from "@/views/landing/Hero";
import Hours from "@/views/landing/Hours";
import Location from "@/views/landing/Location";
import Image from "next/image";
import Collage from "../../public/collage.png";
import Footer from "@/views/landing/Footer";

const page = () => {
  return (
    <div className="relative">
      <Hero />
      <div className="relative z-20  rounded-bl-[8rem] rounded-br-[8rem] overflow-hidden">
        <About />
        <Hours />
        <div className="relative z-10 flex justify-center bg-white">
          <Image
            src={Collage}
            placeholder="blur"
            alt="Coffe_Collage"
            width={1000}
            height={1000}
          />
        </div>
        <Location />
      </div>

      <Footer />
    </div>
  );
};

export default page;
