import About from "@/views/landing/About";
import Hero from "@/views/landing/Hero";
import Hours from "@/views/landing/Hours";
import Location from "@/views/landing/Location";
import Image from "next/image";
import Collage from "../../public/collage.png";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Rental from "@/views/landing/Rental";
import Categories from "@/views/landing/Categories";

const page = () => {
  return (
    <div className="relative">
      <Nav />
      <Hero />
      <div className="relative z-20  overflow-hidden rounded-bl-[8rem] rounded-br-[8rem]">
        <About />
        <Rental />
        <Categories />
        <Hours />
        <div className="relative z-10 flex justify-center bg-white px-10">
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
