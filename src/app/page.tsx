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
import Hours2 from "@/views/landing/Hours2";

const page = () => {
  return (
    <div className="relative">
      <Nav />
      <Hero />
      <div className="relative z-20">
        <About />
        <Rental />
        <Categories />
        <Hours2 />

      </div>

      <Footer />
    </div>
  );
};

export default page;
