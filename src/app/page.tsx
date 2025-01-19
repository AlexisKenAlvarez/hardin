import Nav from "@/components/Nav";
import About from "@/views/landing/About";
import Hero from "@/views/landing/Hero";

const page = () => {
  return (
    <div className="relative">
      {/* <Nav /> */}
      <Hero />
      <div className="w-full h-screen z-20 relative">
      </div>
      {/* <Second /> */}
      <About />
      {/* <Location/> */}
    </div>
  );
};

export default page;
